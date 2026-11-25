"""SEO monitor: Search Console performance + indexing + site health, diffed against the previous snapshot.
Usage: python3 -I monitor.py   (needs GOOGLE_SERVICE_ACCOUNT_JSON or GSA_KEY_FILE)"""
import base64, datetime, glob, json, os, re, subprocess, sys, tempfile, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = 'https://milliondollarmedia.us/'
PRIORITY = ['', 'roofing-video-ads/', 'hvac-facebook-ads/', 'what-is-a-vsl/', 'roofing-video-marketing-services/',
            'hvac-video-marketing-services/', 'plumbing-video-production/', 'home-service-business/', 'mva/', 'real-estate-video-marketing/',
            'solar/', 'saas/', 'strategic-video-marketing-for-coaches/', 'agency-owners/', 'portfolio/', 'case-studies/',
            'case-studies/lead-generation/', 'case-studies/ecommerce/', 'our-story/', 'blogs/',
            'ugc-ads-examples/', 'video-ad-agency/', 'ecommerce-video-ads/', 'facebook-ad-creatives-mastermind/',
            'how-much-do-video-ads-cost/', 'product-video-ads/',
            'commercial-video-production/', 'video-marketing-agency/', 'video-production/los-angeles-ca/']
# Top 10 targets from the 23 Nov 2026 plan (keyword -> target page). Goal: 5+ of these in the top 10 by day 90.
TARGETS = {'video ad agency': 'video-ad-agency/', 'video sales letter': 'what-is-a-vsl/', 'hvac facebook ads': 'hvac-facebook-ads/',
           'real estate video marketing': 'real-estate-video-marketing/', 'ecommerce video ads': 'ecommerce-video-ads/',
           'vsl examples': 'what-is-a-vsl/', 'ugc ads examples': 'ugc-ads-examples/', 'ugc ad examples': 'ugc-ads-examples/',
           'how much do video ads cost': 'how-much-do-video-ads-cost/', 'product video ads': 'product-video-ads/',
           'commercial video production': 'commercial-video-production/', 'video marketing agency': 'video-marketing-agency/',
           'video production company los angeles': 'video-production/los-angeles-ca/'}


def key():
    raw = os.environ.get('GOOGLE_SERVICE_ACCOUNT_JSON')
    if not raw and os.environ.get('GSA_KEY_FILE') and os.path.exists(os.environ['GSA_KEY_FILE']):
        raw = open(os.environ['GSA_KEY_FILE']).read()
    if not raw:
        sys.exit('No Google service-account key: set GOOGLE_SERVICE_ACCOUNT_JSON or GSA_KEY_FILE.')
    return json.loads(raw)


def http(url, data=None, method=None, headers=None, timeout=60):
    r = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(r, timeout=timeout) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()
    except Exception as e:  # network error
        return 0, str(e).encode()


def token(k):
    b64 = lambda b: base64.urlsafe_b64encode(b).rstrip(b'=').decode()
    now = int(time.time())
    h = b64(json.dumps({'alg': 'RS256', 'typ': 'JWT'}).encode())
    c = b64(json.dumps({'iss': k['client_email'], 'scope': 'https://www.googleapis.com/auth/webmasters', 'aud': k['token_uri'], 'iat': now, 'exp': now + 3600}).encode())
    with tempfile.NamedTemporaryFile('w', delete=False) as f:
        f.write(k['private_key']); pem = f.name
    os.chmod(pem, 0o600)
    try:
        sig = subprocess.run(['openssl', 'dgst', '-sha256', '-sign', pem], input=(h + '.' + c).encode(), capture_output=True, check=True).stdout
    finally:
        os.remove(pem)
    st, body = http(k['token_uri'], urllib.parse.urlencode({'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer', 'assertion': h + '.' + c + '.' + b64(sig)}).encode())
    return json.loads(body)['access_token']


def gsc(tok, dims, start, end, limit=500):
    st, body = http('https://searchconsole.googleapis.com/webmasters/v3/sites/%s/searchAnalytics/query' % urllib.parse.quote(SITE, safe=''),
                    json.dumps({'startDate': str(start), 'endDate': str(end), 'dimensions': dims, 'rowLimit': limit}).encode(),
                    headers={'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json'})
    if st != 200:
        return {'error': st}
    return [{'keys': r['keys'], 'clicks': r['clicks'], 'impr': r['impressions'], 'ctr': round(r['ctr'] * 100, 2), 'pos': round(r['position'], 1)} for r in json.loads(body).get('rows', [])]


def inspect(tok, url):
    # Retry: parallel or rapid calls sometimes fail (status 0 / 429) and were reported as a change.
    for attempt in range(3):
        st, body = http('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', json.dumps({'inspectionUrl': url, 'siteUrl': SITE}).encode(),
                        headers={'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json'})
        if st == 200:
            break
        time.sleep(3 * (attempt + 1))
    if st != 200:
        return {'error': st}
    r = json.loads(body)['inspectionResult'].get('indexStatusResult', {})
    return {'verdict': r.get('verdict'), 'coverage': r.get('coverageState'), 'lastCrawl': (r.get('lastCrawlTime') or '')[:10], 'canonical': r.get('googleCanonical')}


def sitemap_urls():
    urls = []
    st, body = http(SITE + 'sitemap_index.xml')
    for sm in re.findall(r'<loc>([^<]+)</loc>', body.decode('utf-8', 'ignore')):
        if 'local-sitemap' in sm:
            continue
        s2, b2 = http(sm)
        urls += re.findall(r'<loc>([^<]+)</loc>', b2.decode('utf-8', 'ignore'))
    return sorted(set(u for u in urls if u.startswith(SITE) and not u.endswith(('.jpg', '.png', '.webp'))))


def health(url):
    st, body = http(url + ('&' if '?' in url else '?') + 'mon=1', headers={'User-Agent': 'Mozilla/5.0 (SEO monitor)'}, timeout=45)
    h = body.decode('utf-8', 'ignore') if isinstance(body, bytes) else ''
    title = re.search(r'<title>([^<]*)', h)
    desc = re.search(r'name="description" content="([^"]*)', h)
    robots = re.search(r'name="robots" content="([^"]*)', h)
    return {'status': st, 'title': title.group(1) if title else '', 'desc_len': len(desc.group(1)) if desc else 0,
            'h1': len(re.findall(r'<h1', h)), 'noindex': bool(robots and 'noindex' in robots.group(1))}


def main():
    k = key()
    tok = token(k)
    today = datetime.date.today()
    end = today - datetime.timedelta(days=2)  # Search Console lags ~2 days
    w1s, w0s, w0e = end - datetime.timedelta(days=6), end - datetime.timedelta(days=13), end - datetime.timedelta(days=7)
    snap = {'taken': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ'), 'window': [str(w1s), str(end)], 'prev_window': [str(w0s), str(w0e)]}
    snap['totals_7d'] = gsc(tok, ['date'], w1s, end, 10)
    snap['queries_7d'] = gsc(tok, ['query'], w1s, end)
    snap['queries_prev7d'] = gsc(tok, ['query'], w0s, w0e)
    snap['pages_7d'] = gsc(tok, ['page'], w1s, end)
    snap['pages_prev7d'] = gsc(tok, ['page'], w0s, w0e)
    snap['query_page_28d'] = gsc(tok, ['query', 'page'], end - datetime.timedelta(days=27), end, 1000)
    snap['countries_28d'] = gsc(tok, ['country'], end - datetime.timedelta(days=27), end, 20)
    snap['indexing'] = {SITE + p: inspect(tok, SITE + p) for p in PRIORITY}
    urls = sitemap_urls()
    with ThreadPoolExecutor(6) as ex:
        snap['health'] = dict(zip(urls, ex.map(health, urls)))
    name = os.path.join(HERE, 'snapshots', snap['taken'].replace(':', '') + '.json')
    prev_files = sorted(glob.glob(os.path.join(HERE, 'snapshots', '*.json')))
    prev = json.load(open(prev_files[-1])) if prev_files else None
    json.dump(snap, open(name, 'w'), indent=1)
    open(os.path.join(HERE, 'latest-report.md'), 'w').write(report(snap, prev))
    print(open(os.path.join(HERE, 'latest-report.md')).read())


def agg(rows):
    if not isinstance(rows, list):
        return {'clicks': 0, 'impr': 0}
    return {'clicks': sum(r['clicks'] for r in rows), 'impr': sum(r['impr'] for r in rows)}


def report(s, prev):
    L = ['# SEO monitor report: %s' % s['taken'], '', 'Search Console window: %s to %s (vs %s to %s). Data lags about 2 days.' % (s['window'][0], s['window'][1], s['prev_window'][0], s['prev_window'][1]), '']
    a, b = agg(s['pages_7d']), agg(s['pages_prev7d'])
    L += ['## Totals (last 7 days vs previous 7)', '', '- Clicks: %d (previous %d)' % (a['clicks'], b['clicks']), '- Impressions: %d (previous %d)' % (a['impr'], b['impr']), '']
    q7 = {r['keys'][0]: r for r in s['queries_7d']} if isinstance(s['queries_7d'], list) else {}
    q0 = {r['keys'][0]: r for r in s['queries_prev7d']} if isinstance(s['queries_prev7d'], list) else {}
    brand = re.compile(r'million|dollar media|milliondollar|mdm', re.I)
    nb = [r for q, r in q7.items() if not brand.search(q)]
    L += ['## Non-brand queries (last 7 days)', '']
    L += ['- "%s": %d impressions, %d clicks, position %.1f%s' % (r['keys'][0], r['impr'], r['clicks'], r['pos'], ('' if r['keys'][0] not in q0 else ' (was %.1f)' % q0[r['keys'][0]]['pos'])) for r in sorted(nb, key=lambda x: -x['impr'])[:30]] or ['- none yet']
    L += ['', '## Top 10 target keywords (28 days, exact query)', '']
    q28 = {}
    for r in s.get('query_page_28d') or []:
        q = r['keys'][0]
        if q in TARGETS and (q not in q28 or r['impr'] > q28[q]['impr']):
            q28[q] = r
    for kw, page in TARGETS.items():
        r = q28.get(kw)
        L.append('- "%s" -> /%s: %s' % (kw, page, ('position %.1f, %d impressions, ranking page %s%s' % (r['pos'], r['impr'], r['keys'][1].replace(SITE, '/'), '  TOP 10' if r['pos'] <= 10 else '')) if r else 'not ranking yet'))
    L.append('- In the top 10: %d of %d' % (sum(1 for r in q28.values() if r['pos'] <= 10), len(TARGETS)))
    L += ['', '## Opportunities', '']
    opp = [r for r in q7.values() if 4 <= r['pos'] <= 20 and r['impr'] >= 5]
    L += ['- Position 4-20: "%s" pos %.1f, %d impressions' % (r['keys'][0], r['pos'], r['impr']) for r in sorted(opp, key=lambda x: -x['impr'])[:15]] or ['- No queries at positions 4-20 with 5+ impressions yet']
    low = [r for r in q7.values() if r['impr'] >= 20 and r['ctr'] < 2]
    L += ['- Low CTR: "%s" %d impressions, %.1f%% CTR, pos %.1f' % (r['keys'][0], r['impr'], r['ctr'], r['pos']) for r in sorted(low, key=lambda x: -x['impr'])[:10]]
    new = [q for q in q7 if q not in q0]
    if new:
        L += ['- New queries this week: ' + ', '.join('"%s"' % q for q in new[:20])]
    lost = [q for q in q0 if q not in q7]
    if lost:
        L += ['- Queries that disappeared: ' + ', '.join('"%s"' % q for q in lost[:20])]
    L += ['', '## Pages (last 7 days)', '']
    p0 = {r['keys'][0]: r for r in s['pages_prev7d']} if isinstance(s['pages_prev7d'], list) else {}
    for r in sorted(s['pages_7d'] if isinstance(s['pages_7d'], list) else [], key=lambda x: -x['impr'])[:25]:
        was = p0.get(r['keys'][0])
        L.append('- %s: %d impr, %d clicks, pos %.1f%s' % (r['keys'][0].replace(SITE, '/'), r['impr'], r['clicks'], r['pos'], (' (was %d impr, pos %.1f)' % (was['impr'], was['pos'])) if was else ' (new)'))
    L += ['', '## Indexing (priority pages)', '']
    pi = prev.get('indexing', {}) if prev else {}
    for u, v in s['indexing'].items():
        old = pi.get(u, {}).get('coverage')
        chg = '' if not prev or old == v.get('coverage') else '  CHANGED (was: %s)' % old
        L.append('- %s: %s, last crawl %s%s' % (u.replace(SITE, '/'), v.get('coverage') or v.get('error'), v.get('lastCrawl') or '-', chg))
    L += ['', '## Site health (%d sitemap URLs)' % len(s['health']), '']
    bad = [(u, h) for u, h in s['health'].items() if h['status'] != 200]
    meta = [(u, h) for u, h in s['health'].items() if h['status'] == 200 and not h['noindex'] and (not h['title'] or h['desc_len'] < 50 or h['h1'] != 1)]
    titles = {}
    for u, h in s['health'].items():
        if h['status'] == 200 and not h['noindex'] and h['title']:
            titles.setdefault(h['title'], []).append(u)
    dup = {t: us for t, us in titles.items() if len(us) > 1}
    L += ['- Not returning 200: %d %s' % (len(bad), ', '.join('%s (%s)' % (u.replace(SITE, '/'), h['status']) for u, h in bad[:15]))]
    L += ['- Indexable pages with missing title, short description or not exactly one H1: %d %s' % (len(meta), ', '.join(u.replace(SITE, '/') for u, h in meta[:15]))]
    L += ['- Duplicate titles: %d' % len(dup)] + ['  - "%s": %s' % (t, ', '.join(x.replace(SITE, '/') for x in us)) for t, us in list(dup.items())[:10]]
    return '\n'.join(L) + '\n'


if __name__ == '__main__':
    main()
