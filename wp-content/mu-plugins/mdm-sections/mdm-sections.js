/*!
 * Million Dollar Media - homepage sections. Vanilla JS, no dependencies.
 * Every init function is idempotent, so it is safe with Elementor re-renders.
 */
(function () {
	'use strict';

	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var mobileMQ = window.matchMedia('(max-width: 767px)');
	var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
	var easeInOut = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
	var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
	var once = function (el, key) { if (el['__mdm_' + key]) { return false; } el['__mdm_' + key] = true; return true; };

	/* ------------------------------------------------------------------ */
	/* Shared helpers                                                      */
	/* ------------------------------------------------------------------ */

	var tickers = [];
	var ticking = false;
	function requestTick() {
		if (ticking) { return; }
		ticking = true;
		requestAnimationFrame(function () {
			ticking = false;
			for (var i = 0; i < tickers.length; i++) { tickers[i](); }
		});
	}
	window.addEventListener('scroll', requestTick, { passive: true });
	window.addEventListener('resize', requestTick);

	function onInView(el, cb, threshold, rootMargin) {
		if (!('IntersectionObserver' in window)) { cb(); return; }
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) { cb(); io.disconnect(); }
			});
		}, { threshold: threshold || 0.2, rootMargin: rootMargin || '0px' });
		io.observe(el);
	}

	// Wait for the opening loader (if any) before playing entrance animations.
	function afterLoader(cb) {
		var loader = document.getElementById('mdm-loader');
		if (!loader || loader.classList.contains('is-gone') || loader.classList.contains('is-done')) { cb(); return; }
		var fired = false;
		var go = function () { if (!fired) { fired = true; setTimeout(cb, 250); } };
		document.addEventListener('mdm:loaded', go, { once: true });
		setTimeout(go, 6000);
	}

	function reveal(root, threshold, cb) {
		afterLoader(function () {
			onInView(root, function () {
				root.classList.add('is-inview');
				if (cb) { cb(); }
			}, threshold || 0.15);
		});
	}

	function countUp(el) {
		if (!once(el, 'counted')) { return; }
		var raw = el.getAttribute('data-to') || el.textContent;
		var to = parseFloat(raw);
		if (isNaN(to)) { return; }
		var decimals = (String(raw).split('.')[1] || '').length;
		var fmt = function (n) { return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }); };
		if (reduceMotion) { el.textContent = fmt(to); return; }
		var start = performance.now();
		var dur = 1600;
		(function step(now) {
			var t = clamp((now - start) / dur, 0, 1);
			el.textContent = fmt(to * (1 - Math.pow(1 - t, 4)));
			if (t < 1) { requestAnimationFrame(step); }
		})(start);
	}
	function zeroCounters(root) {
		if (reduceMotion) { return; }
		$$('.mdm-count', root).forEach(function (c) {
			var raw = c.getAttribute('data-to') || '0';
			c.textContent = (0).toFixed((raw.split('.')[1] || '').length);
		});
	}

	// Lazy videos: load when near, play only while visible.
	var videoIO = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
		entries.forEach(function (e) {
			var v = e.target;
			if (e.isIntersecting) { playVideo(v); } else { pauseVideo(v); }
		});
	}, { rootMargin: '200px 0px', threshold: 0.2 }) : null;

	// Works for <video> and for Vimeo / YouTube <iframe> players.
	function framePost(f, vimeoMsg, ytFunc) {
		if (!f.contentWindow) { return; }
		var type = f.getAttribute('data-type');
		try {
			if (type === 'vimeo') { f.contentWindow.postMessage(JSON.stringify(vimeoMsg), '*'); }
			if (type === 'youtube') { f.contentWindow.postMessage(JSON.stringify({ event: 'command', func: ytFunc, args: [] }), '*'); }
		} catch (e) {}
	}
	function playVideo(v) {
		var card = v.closest('.mdm-reel');
		if (card && card.classList.contains('is-paused')) { return; }
		if (!v.getAttribute('src') && v.dataset.src) { v.src = v.dataset.src; }
		if (v.tagName === 'IFRAME') { framePost(v, { method: 'play' }, 'playVideo'); return; }
		var p = v.play();
		if (p && p.catch) { p.catch(function () {}); }
	}
	function pauseVideo(v) {
		if (v.tagName === 'IFRAME') { framePost(v, { method: 'pause' }, 'pauseVideo'); return; }
		v.pause();
	}
	function isPaused(v) {
		if (v.tagName === 'IFRAME') { return v.closest('.mdm-reel').classList.contains('is-paused'); }
		return v.paused;
	}
	function setSound(v, on) {
		if (v.tagName !== 'IFRAME') { v.muted = !on; return; }
		var want = on ? v.getAttribute('data-src-sound') : v.getAttribute('data-src');
		// Swapping to the "with sound" player is the reliable way to get audio from embeds.
		if (want && v.getAttribute('src') !== want) { v.setAttribute('src', want); }
	}
	function watchVideos(root) {
		$$('.mdm-reel__frame[data-src]', root).forEach(function (v) {
			if (!once(v, 'video')) { return; }
			if (videoIO) { videoIO.observe(v); } else { playVideo(v); }
		});
		$$('video[data-src]', root).forEach(function (v) {
			if (!once(v, 'video')) { return; }
			v.muted = true;
			if (videoIO) { videoIO.observe(v); } else { playVideo(v); }
		});
	}

	// Progress of an element through the viewport: -1 entering .. 0 centred .. 1 leaving.
	function viewProgress(el) {
		var r = el.getBoundingClientRect();
		var vh = window.innerHeight;
		if (r.bottom < -100 || r.top > vh + 100) { return null; }
		return clamp((vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2) * 2, -1, 1);
	}

	/* ------------------------------------------------------------------ */
	/* 1. Reels video grid                                                 */
	/* ------------------------------------------------------------------ */

	function initReels(root) {
		if (!once(root, 'init')) { return; }
		var cards = $$('.mdm-reel', root);
		var videos = $$('.mdm-reel__video', root);

		reveal(root, 0.1);
		watchVideos(root);

		// Each card flips in when its row scrolls into view.
		afterLoader(function () {
			cards.forEach(function (card) {
				onInView(card, function () {
					card.classList.add('is-in');
					setTimeout(function () { card.classList.add('is-settled'); }, reduceMotion ? 0 : 1500);
				}, 0.15);
			});
		});

		var moreBtn = root.querySelector('[data-mdm-reels-more]');
		if (moreBtn) {
			moreBtn.addEventListener('click', function () {
				root.classList.add('is-expanded');
				moreBtn.parentNode.removeChild(moreBtn);
				$$('.mdm-reel.is-extra', root).forEach(function (c, k) {
					setTimeout(function () { c.classList.add('is-in'); setTimeout(function () { c.classList.add('is-settled'); }, 1400); }, 60 + (k % 4) * 90);
				});
			});
		}

		root.addEventListener('click', function (ev) {
			var btn = ev.target.closest('.mdm-reel__play, .mdm-reel__mute');
			if (!btn || !root.contains(btn)) { return; }
			ev.preventDefault();
			var card = btn.closest('.mdm-reel');
			var v = card.querySelector('.mdm-reel__video');
			if (!v) { return; }

			if (btn.classList.contains('mdm-reel__play')) {
				if (isPaused(v)) {
					card.classList.remove('is-paused');
					btn.setAttribute('aria-label', 'Pause video');
					playVideo(v);
				} else {
					card.classList.add('is-paused');
					btn.setAttribute('aria-label', 'Play video');
					pauseVideo(v);
				}
				return;
			}

			// Only one card plays sound at a time.
			var willUnmute = !card.classList.contains('is-unmuted');
			videos.forEach(function (o) {
				var c = o.closest('.mdm-reel');
				if (c.classList.contains('is-unmuted') || o.tagName !== 'IFRAME') { setSound(o, false); }
				c.classList.remove('is-unmuted');
				var b = c.querySelector('.mdm-reel__mute');
				if (b) { b.textContent = 'Unmute'; b.setAttribute('aria-label', 'Unmute video'); }
			});
			if (willUnmute) {
				setSound(v, true);
				card.classList.add('is-unmuted');
				card.classList.remove('is-paused');
				btn.textContent = 'Mute';
				btn.setAttribute('aria-label', 'Mute video');
				playVideo(v);
			}
		});

		if (reduceMotion) { return; }

		// Hover: 3D tilt following the cursor.
		cards.forEach(function (card) {
			card.addEventListener('pointermove', function (e) {
				if (e.pointerType !== 'mouse') { return; }
				var r = card.getBoundingClientRect();
				var x = (e.clientX - r.left) / r.width - 0.5;
				var y = (e.clientY - r.top) / r.height - 0.5;
				card.style.setProperty('--ty', (x * 16).toFixed(2) + 'deg');
				card.style.setProperty('--tx', (-y * 12).toFixed(2) + 'deg');
			});
			card.addEventListener('pointerleave', function () {
				card.style.setProperty('--ty', '0deg');
				card.style.setProperty('--tx', '0deg');
			});
		});

		// Scroll: every row of cards is gathered into a stack while it sits low
		// on the screen and fans out as it reaches the middle; on the way out
		// the fan opens a little further and the cards drift apart.
		var smooth = cards.map(function () { return 1; });
		tickers.push(function () {
			var perRow = mobileMQ.matches ? 2 : 4;
			var vh = window.innerHeight;
			var moving = false;
			for (var r = 0; r * perRow < cards.length; r++) {
				var first = cards[r * perRow];
				var rect = first.getBoundingClientRect();
				var mid = rect.top + rect.height / 2;
				if (rect.bottom < -200 || rect.top > vh + 200) { continue; }
				// 0 when the row centre is at 85% of the viewport, 1 at 50%
				var open = easeInOut(clamp((vh * .85 - mid) / (vh * .35), 0, 1));
				var leave = clamp((vh * .5 - mid) / (vh * .5), 0, 1);
				for (var k = 0; k < perRow; k++) {
					var idx = r * perRow + k;
					var c = cards[idx];
					if (!c) { break; }
					var target = 1 - open;
					smooth[idx] += (target - smooth[idx]) * .18;
					if (Math.abs(target - smooth[idx]) > .002) { moving = true; } else { smooth[idx] = target; }
					var dir = k % 2 ? -1 : 1;
					c.style.setProperty('--g', smooth[idx].toFixed(3));
					c.style.setProperty('--sy', (dir * leave * 34).toFixed(1) + 'px');
					c.style.setProperty('--sr', ((k - (perRow - 1) / 2) * leave * 2.4).toFixed(2) + 'deg');
				}
			}
			if (moving) { requestTick(); }
		});
		requestTick();
	}

	/* ------------------------------------------------------------------ */
	/* 2. Impact stacked cards                                             */
	/* ------------------------------------------------------------------ */

	function initImpact(root) {
		if (!once(root, 'init')) { return; }
		var cards = $$('.mdm-case', root);
		var dots = $$('.mdm-impact__dots i', root);
		var sticker = root.querySelector('.mdm-sticker');
		var n = cards.length;
		var lastActive = -1;

		zeroCounters(root);
		reveal(root, 0.05, function () {
			var c = cards[Math.max(0, lastActive)];
			var cnt = c && c.querySelector('.mdm-count');
			if (cnt) { countUp(cnt); }
		});

		function update() {
			var r = root.getBoundingClientRect();
			var vh = window.innerHeight;
			if (r.bottom < -vh || r.top > vh * 2) { return; }

			var travel = Math.max(1, r.height - vh);
			var p = clamp(-r.top / travel, 0, 1);
			var f = p * (n - 1);

			var enter = cards.map(function (c, i) {
				if (i === 0) { return 0; }
				return 1 - easeInOut(clamp(f - (i - 1), 0, 1));
			});

			cards.forEach(function (c, i) {
				var depth = 0;
				for (var j = i + 1; j < n; j++) { depth += 1 - enter[j]; }
				c.style.setProperty('--enter', enter[i].toFixed(4));
				c.style.setProperty('--d', Math.min(depth, 3.2).toFixed(4));
				c.style.visibility = depth > 3.6 ? 'hidden' : 'visible';
			});

			var active = 0;
			for (var k = 0; k < n; k++) { if (enter[k] < 0.35) { active = k; } }
			if (active !== lastActive) {
				lastActive = active;
				cards.forEach(function (c, i) { c.classList.toggle('is-active', i === active); });
				dots.forEach(function (d, i) { d.classList.toggle('is-on', i === active); });
				if (root.classList.contains('is-inview')) {
					var cnt = cards[active].querySelector('.mdm-count');
					if (cnt) { countUp(cnt); }
				}
			}

			root.style.setProperty('--gy', (-p * 160).toFixed(1) + 'px');
			if (sticker) {
				sticker.style.setProperty('--sr', (p * 360).toFixed(1) + 'deg');
				sticker.style.setProperty('--sy', (Math.sin(p * Math.PI * 2) * 10).toFixed(1) + 'px');
			}
		}

		tickers.push(update);
		update();
	}

	/* ------------------------------------------------------------------ */
	/* 3. Generic reveal sections (how it works, numbers, about, ...)      */
	/* ------------------------------------------------------------------ */

	function initReveal(root) {
		if (!once(root, 'reveal')) { return; }
		zeroCounters(root);
		watchVideos(root);
		reveal(root, 0.12, function () {
			setTimeout(function () { $$('.mdm-count', root).forEach(countUp); }, 400);
			if (root.classList.contains('mdm-how')) {
				setTimeout(function () { root.classList.add('is-settled'); }, reduceMotion ? 0 : 1900);
			}
		});

		// About: slow parallax on the banner photo.
		var photo = root.querySelector('.mdm-about__img, .mdm-about__photo img');
		if (photo && !reduceMotion) {
			tickers.push(function () {
				var p = viewProgress(root);
				if (p !== null) { photo.style.setProperty('--py', (p * 16).toFixed(1) + 'px'); }
			});
			requestTick();
		}
	}

	/* ------------------------------------------------------------------ */
	/* 4. Case studies: tabs + lightbox                                    */
	/* ------------------------------------------------------------------ */

	function initCases(root) {
		if (!once(root, 'cases')) { return; }
		var btns = $$('.mdm-switch__btn', root);
		var thumb = root.querySelector('.mdm-switch__thumb');
		var panels = $$('.mdm-cases__grid', root);
		var lightbox = root.querySelector('.mdm-lightbox');

		function moveThumb() {
			var on = root.querySelector('.mdm-switch__btn.is-on');
			if (!on || !thumb) { return; }
			thumb.style.setProperty('--tw', on.offsetWidth + 'px');
			thumb.style.setProperty('--tx', (on.offsetLeft - 6) + 'px');
		}
		function animatePanel(panel) {
			panel.classList.remove('is-anim');
			void panel.offsetWidth; // restart the card animation
			panel.classList.add('is-anim');
		}

		btns.forEach(function (b) {
			b.addEventListener('click', function () {
				var key = b.getAttribute('data-tab');
				btns.forEach(function (o) {
					var on = o === b;
					o.classList.toggle('is-on', on);
					o.setAttribute('aria-selected', on ? 'true' : 'false');
				});
				panels.forEach(function (p) {
					var on = p.getAttribute('data-panel') === key;
					p.hidden = !on;
					p.classList.toggle('is-on', on);
					if (on) { animatePanel(p); }
				});
				moveThumb();
			});
		});
		window.addEventListener('resize', moveThumb);
		if (document.fonts && document.fonts.ready) { document.fonts.ready.then(moveThumb); }
		moveThumb();

		var showAll = root.querySelector('[data-mdm-cases-more]');
		var updateShort = function () {
			var on = root.querySelector('.mdm-cases__grid.is-on');
			root.classList.toggle('is-short', !on || on.querySelectorAll('.mdm-cs').length <= 6);
		};
		if (showAll) { showAll.addEventListener('click', function () { root.classList.add('is-expanded'); }); }
		btns.forEach(function (b) { b.addEventListener('click', updateShort); });
		updateShort();

		var firstPanel = root.querySelector('.mdm-cases__grid.is-on');
		if (firstPanel) {
			afterLoader(function () { onInView(firstPanel, function () { animatePanel(firstPanel); moveThumb(); }, 0.08); });
		}

		// Lightbox
		if (lightbox) {
			var img = lightbox.querySelector('img');
			var lastFocus = null;
			var close = function () { lightbox.hidden = true; document.documentElement.classList.remove('mdm-menu-open'); if (lastFocus) { lastFocus.focus(); } };
			root.addEventListener('click', function (e) {
				var shot = e.target.closest('.mdm-cs__shot');
				if (!shot) { return; }
				lastFocus = shot;
				img.src = shot.getAttribute('data-full');
				img.alt = shot.querySelector('img') ? shot.querySelector('img').alt : '';
				lightbox.hidden = false;
				document.documentElement.classList.add('mdm-menu-open');
				lightbox.querySelector('.mdm-lightbox__close').focus();
			});
			lightbox.addEventListener('click', function (e) { if (e.target === lightbox || e.target.closest('.mdm-lightbox__close')) { close(); } });
			document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) { close(); } });
		}
	}

	/* ------------------------------------------------------------------ */
	/* 5. FAQ chat                                                         */
	/* ------------------------------------------------------------------ */

	var STOP = 'a an the is are do does did i you we my your our can how what which who why when to of for in on with and or be it this that me us at by from as have has will would should could'.split(' ');
	function tokens(s) {
		return String(s).toLowerCase().replace(/[^a-z0-9$%+ ]+/g, ' ').split(/\s+/).filter(function (w) { return w && STOP.indexOf(w) === -1; });
	}

	function initFaq(root) {
		if (!once(root, 'faq')) { return; }
		var dataEl = root.querySelector('[data-faq-data]');
		if (!dataEl) { return; }
		var data;
		try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }
		var items = data.items || [];

		var list = $$('[data-faq-q]', root);
		var log = root.querySelector('[data-faq-log]');
		var suggest = root.querySelector('[data-faq-suggest]');
		var indexEl = root.querySelector('[data-faq-index]');
		var search = root.querySelector('[data-faq-search]');
		var filters = $$('[data-faq-cat]', root);
		var empty = root.querySelector('.mdm-faq__empty');
		var form = root.querySelector('[data-faq-form]');
		var input = root.querySelector('[data-faq-input]');
		var current = 0;
		var typingTimer = null;
		var started = false;

		function pad(n) { return (n < 10 ? '0' : '') + n; }

		function setActive(i) {
			current = i;
			list.forEach(function (b, k) {
				var on = k === i;
				b.classList.toggle('is-on', on);
				if (on) { b.setAttribute('aria-current', 'true'); } else { b.removeAttribute('aria-current'); }
			});
			if (indexEl) { indexEl.textContent = pad(i + 1); }
			var btn = list[i];
			var box = btn && btn.closest('.mdm-faq__list');
			if (box && box.scrollHeight > box.clientHeight) {
				var top = btn.offsetTop - box.offsetTop;
				if (top < box.scrollTop || top > box.scrollTop + box.clientHeight - btn.offsetHeight) {
					box.scrollTo({ top: top - 20, behavior: 'smooth' });
				}
			}
		}

		function bubble(cls, html) {
			var d = document.createElement('div');
			d.className = 'mdm-msg ' + cls;
			if (html !== undefined) { d.innerHTML = html; }
			log.appendChild(d);
			log.scrollTop = log.scrollHeight;
			return d;
		}
		function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

		function typeAnswer(el, text, tags, done) {
			clearInterval(typingTimer);
			var who = '<span class="who">MDM Team</span>';
			if (reduceMotion) {
				el.innerHTML = who + '<span class="txt">' + esc(text) + '</span>';
				addTags(el, tags); if (done) { done(); } return;
			}
			el.innerHTML = who + '<span class="txt"></span><span class="mdm-caret"></span>';
			var span = el.querySelector('.txt');
			var words = text.split(' ');
			var i = 0;
			typingTimer = setInterval(function () {
				i++;
				span.textContent = words.slice(0, i).join(' ');
				log.scrollTop = log.scrollHeight;
				if (i >= words.length) {
					clearInterval(typingTimer);
					var c = el.querySelector('.mdm-caret'); if (c) { c.remove(); }
					addTags(el, tags);
					if (done) { done(); }
				}
			}, 32);
		}
		function addTags(el, tags) {
			if (!tags || !tags.length) { return; }
			var t = document.createElement('div');
			t.className = 'mdm-msg__tags';
			tags.forEach(function (tag) { var s = document.createElement('span'); s.textContent = tag; t.appendChild(s); });
			el.appendChild(t);
		}

		function renderSuggestions(i) {
			suggest.innerHTML = '';
			var picks = [];
			for (var k = 1; picks.length < 2 && k < items.length; k++) { picks.push((i + k) % items.length); }
			picks.forEach(function (p) {
				var b = document.createElement('button');
				b.type = 'button';
				b.textContent = items[p].q;
				b.addEventListener('click', function () { ask(p); });
				suggest.appendChild(b);
			});
		}

		function converse(userText, answer, tags, idx, isHtml) {
			clearInterval(typingTimer);
			log.innerHTML = '';
			suggest.innerHTML = '';
			bubble('mdm-msg--user', esc(userText));
			var bot = bubble('mdm-msg--bot', '<span class="mdm-typing"><i></i><i></i><i></i></span>');
			setTimeout(function () {
				if (isHtml) {
					bot.innerHTML = '<span class="who">MDM Team</span>' + answer;
					renderSuggestions(idx < 0 ? 0 : idx);
				} else {
					typeAnswer(bot, answer, tags, function () { renderSuggestions(idx); });
				}
			}, reduceMotion ? 0 : 650);
		}

		function ask(i) {
			setActive(i);
			converse(items[i].q, items[i].a, items[i].tags, i, false);
		}

		// Free-text question -> best keyword match, or a friendly hand-off.
		function askFree(text) {
			var q = tokens(text);
			var best = -1, bestScore = 0;
			items.forEach(function (it, k) {
				var hay = tokens(it.q + ' ' + it.a + ' ' + (it.tags || []).join(' '));
				var qs = tokens(it.q);
				var score = 0;
				q.forEach(function (w) {
					if (qs.indexOf(w) !== -1) { score += 3; }
					else if (hay.indexOf(w) !== -1) { score += 1; }
					else if (w.length > 4 && hay.some(function (h) { return h.indexOf(w.slice(0, 5)) === 0; })) { score += 0.5; }
				});
				score = score / Math.sqrt(q.length || 1);
				if (score > bestScore) { bestScore = score; best = k; }
			});
			if (best > -1 && bestScore >= 1.2) {
				setActive(best);
				converse(text, items[best].a, items[best].tags, best, false);
			} else {
				converse(text, data.fallback, null, current, true);
			}
		}

		list.forEach(function (b, k) { b.addEventListener('click', function () { ask(k); }); });
		var prev = root.querySelector('[data-faq-prev]');
		var next = root.querySelector('[data-faq-next]');
		if (prev) { prev.addEventListener('click', function () { ask((current - 1 + items.length) % items.length); }); }
		if (next) { next.addEventListener('click', function () { ask((current + 1) % items.length); }); }

		var activeCat = 'all';
		function applyFilter() {
			var term = (search.value || '').toLowerCase().trim();
			var shown = 0;
			list.forEach(function (b, k) {
				var it = items[k];
				var ok = (activeCat === 'all' || it.cat === activeCat) && (!term || (it.q + ' ' + it.a).toLowerCase().indexOf(term) !== -1);
				b.parentNode.hidden = !ok;
				if (ok) { shown++; }
			});
			if (empty) { empty.hidden = shown > 0; }
		}
		filters.forEach(function (f) {
			f.addEventListener('click', function () {
				activeCat = f.getAttribute('data-faq-cat');
				filters.forEach(function (o) { o.classList.toggle('is-on', o === f); });
				applyFilter();
			});
		});
		if (search) { search.addEventListener('input', applyFilter); }

		if (form) {
			form.addEventListener('submit', function (e) {
				e.preventDefault();
				var v = (input.value || '').trim();
				if (!v) { input.focus(); return; }
				input.value = '';
				askFree(v);
			});
		}

		// Start the first answer typing once the chat is on screen.
		afterLoader(function () {
			onInView(root.querySelector('.mdm-faq__app') || root, function () {
				if (!started) { started = true; ask(0); }
			}, 0.3);
		});
	}

	/* ------------------------------------------------------------------ */
	/* 6. Menu                                                             */
	/* ------------------------------------------------------------------ */

	function initMenu(root) {
		if (!once(root, 'menu')) { return; }
		var toggle = root.querySelector('.mdm-nav__toggle');
		var panel = root.querySelector('.mdm-nav__panel');
		var label = root.querySelector('.mdm-nav__label');
		var closeTimer = null;

		function open() {
			clearTimeout(closeTimer);
			panel.hidden = false;
			requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('is-open'); }); });
			toggle.setAttribute('aria-expanded', 'true');
			if (label) { label.textContent = label.getAttribute('data-close'); }
			document.documentElement.classList.add('mdm-menu-open');
			setTimeout(function () { var a = panel.querySelector('a'); if (a) { a.focus({ preventScroll: true }); } }, 400);
		}
		function close(focusToggle) {
			root.classList.remove('is-open');
			toggle.setAttribute('aria-expanded', 'false');
			if (label) { label.textContent = label.getAttribute('data-open'); }
			document.documentElement.classList.remove('mdm-menu-open');
			closeTimer = setTimeout(function () { panel.hidden = true; }, reduceMotion ? 0 : 850);
			if (focusToggle) { toggle.focus(); }
		}
		toggle.addEventListener('click', function () { if (root.classList.contains('is-open')) { close(true); } else { open(); } });
		panel.addEventListener('click', function (e) { if (e.target.closest('a')) { close(false); } });
		document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('is-open')) { close(true); } });

		// Hide the bar while scrolling down, show it when scrolling up.
		var lastY = window.pageYOffset;
		tickers.push(function () {
			var y = window.pageYOffset;
			if (Math.abs(y - lastY) < 6) { return; }
			root.classList.toggle('is-hidden', y > lastY && y > 160);
			lastY = y;
		});
	}

	/* ------------------------------------------------------------------ */
	/* 7. Footer                                                           */
	/* ------------------------------------------------------------------ */

	function initFooter(root) {
		if (!once(root, 'footer')) { return; }
		var t = root.querySelector('[data-tz]');
		if (t) {
			var tz = t.getAttribute('data-tz');
			var tick = function () {
				try {
					t.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz });
				} catch (e) {
					t.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
				}
			};
			tick();
			setInterval(tick, 1000);
		}
		var top = root.querySelector('[data-mdm-top]');
		if (top) {
			top.addEventListener('click', function (e) {
				e.preventDefault();
				window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
			});
		}
	}

	/* ------------------------------------------------------------------ */
	/* Boot                                                                */
	/* ------------------------------------------------------------------ */

	/* ------------------------------------------------------------------ */
	/* Pricing quantity selectors                                          */
	/* ------------------------------------------------------------------ */

	function initPricing(root) {
		if (!once(root, 'pricing')) { return; }
		$$('.mdm-plan', root).forEach(function (plan) {
			var out = plan.querySelector('[data-qty-val]');
			var total = plan.querySelector('[data-plan-total]');
			var cta = plan.querySelector('.mdm-plan__cta');
			var price = parseFloat(plan.getAttribute('data-price')) || 0;
			var qty = 1;
			$$('[data-qty]', plan).forEach(function (b) {
				b.addEventListener('click', function () {
					qty = clamp(qty + parseInt(b.getAttribute('data-qty'), 10), 1, 99);
					out.textContent = qty;
					total.textContent = (price * qty).toFixed(2);
					var url = cta.getAttribute('data-base');
					cta.href = url + (url.indexOf('?') === -1 ? '?' : '&') + 'quantity=' + qty;
				});
			});
		});
	}

	/* ------------------------------------------------------------------ */
	/* Light theme for existing Elementor pages                            */
	/* Dark backgrounds -> white, white text -> dark. Photos, videos and   */
	/* image backgrounds are never touched; the header keeps its design.   */
	/* ------------------------------------------------------------------ */

	var MDM_OWN = '.mdm-newhome, .mdm-site-footer, .mdm-nav, .mdm-loader, .mdm-curtain, .mdm-progress, [data-mdm-reels], [data-mdm-impact], [data-mdm-reveal], [data-mdm-faq], [data-mdm-menu], [data-mdm-footer], [data-mdm-cases], [data-mdm-pricing], .mdm-shop-head';
	var KEEP_DARK = MDM_OWN + ', header, .site-header, #masthead, .elementor-location-header, [data-elementor-type="header"], .elementor-location-popup, .elementor-button, video, iframe';

	function rgba(str) {
		var m = /rgba?\(([^)]+)\)/.exec(str || '');
		if (!m) { return null; }
		var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
		return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
	}
	function lum(c) { return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255; }
	function hasDarkColor(gradient) {
		var re = /rgba?\([^)]+\)/g, m;
		while ((m = re.exec(gradient))) { var c = rgba(m[0]); if (c && c.a > 0.3 && lum(c) < 0.3) { return true; } }
		return false;
	}

	function initLight() {
		var root = document.documentElement;
		var body = document.body;
		if (!body || !body.classList.contains('mdm-site-light') || body.__mdm_light) { root.classList.remove('mdm-light-pending'); return; }
		body.__mdm_light = true;
		try {
			var bodyBg = rgba(getComputedStyle(body).backgroundColor);
			if (!bodyBg || bodyBg.a < 0.1 || lum(bodyBg) < 0.3) { body.style.setProperty('background-color', '#FFFFFF', 'important'); }

			// 1. Backgrounds
			var boxes = $$('.elementor-element, .elementor-widget-container, .e-con-inner, .elementor-widget-wrap, .elementor-column-wrap, .elementor-background-overlay, #page, .site, .site-content, .ast-container, #content, main');
			boxes.slice(0, 8000).forEach(function (el) {
				if (el.closest(KEEP_DARK)) { return; }
				var cs = getComputedStyle(el);
				var img = cs.backgroundImage || 'none';
				if (img.indexOf('url(') !== -1) { el.setAttribute('data-mdm-photo', '1'); return; } // photo background: untouched
				var bg = rgba(cs.backgroundColor);
				var changed = false;
				if (img !== 'none' && img.indexOf('gradient') !== -1 && hasDarkColor(img)) {
					el.style.setProperty('background-image', 'linear-gradient(210deg, rgba(237,28,36,.08) 0%, rgba(255,255,255,0) 55%)', 'important');
					changed = true;
				}
				if (bg && bg.a > 0.25 && lum(bg) < 0.3) {
					if (el.classList.contains('elementor-background-overlay')) {
						el.style.setProperty('background-color', 'transparent', 'important');
					} else {
						el.style.setProperty('background-color', '#FFFFFF', 'important');
						changed = true;
					}
				}
				if (changed) { el.setAttribute('data-mdm-light', '1'); }
			});

			// 2. Text, icons and borders that sit on a now-light background
			function onLight(el) {
				var n = el;
				while (n && n !== document.documentElement) {
					if (n.hasAttribute && (n.hasAttribute('data-mdm-photo'))) { return false; }
					if (n.hasAttribute && n.hasAttribute('data-mdm-light')) { return true; }
					var c = rgba(getComputedStyle(n).backgroundColor);
					if (c && c.a > 0.5) { return lum(c) > 0.6; }
					if (getComputedStyle(n).backgroundImage.indexOf('url(') !== -1) { return false; }
					n = n.parentElement;
				}
				return true;
			}
			var texts = $$('.elementor h1, .elementor h2, .elementor h3, .elementor h4, .elementor h5, .elementor h6, .elementor p, .elementor span, .elementor a, .elementor li, .elementor strong, .elementor em, .elementor b, .elementor i, .elementor label, .elementor blockquote, .elementor td, .elementor th, .elementor small, .elementor div, .elementor svg, .elementor svg path');
			texts.slice(0, 12000).forEach(function (el) {
				if (el.closest(KEEP_DARK)) { return; }
				var cs = getComputedStyle(el);
				var col = rgba(cs.color);
				var isSvg = el instanceof SVGElement;
				var fill = isSvg ? rgba(cs.fill) : null;
				var stroke = rgba(cs.webkitTextStrokeColor);
				var border = parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderBottomWidth) > 0 ? rgba(cs.borderTopColor) : null;
				var needs = (col && lum(col) > 0.78 && el.childNodes.length) || (fill && lum(fill) > 0.78) || (stroke && lum(stroke) > 0.78 && parseFloat(cs.webkitTextStrokeWidth) > 0) || (border && border.a > 0.2 && lum(border) > 0.85);
				if (!needs || !onLight(el)) { return; }
				if (col && lum(col) > 0.78) { el.style.setProperty('color', '#111114', 'important'); }
				if (fill && lum(fill) > 0.78) { el.style.setProperty('fill', '#111114', 'important'); }
				if (stroke && lum(stroke) > 0.78 && parseFloat(cs.webkitTextStrokeWidth) > 0) { el.style.setProperty('-webkit-text-stroke-color', '#111114', 'important'); }
				if (border && border.a > 0.2 && lum(border) > 0.85) { el.style.setProperty('border-color', 'rgba(17,17,20,.12)', 'important'); }
			});

			// 3. White logos (transparent PNG/SVG that are almost all white) would vanish on white:
			//    show them dark. Photos (no transparency) are never changed.
			$$('.elementor img').forEach(function (img) {
				if (img.closest(KEEP_DARK) || !onLight(img)) { return; }
				var check = function () {
					try {
						var c = document.createElement('canvas'); c.width = c.height = 24;
						var x = c.getContext('2d'); x.drawImage(img, 0, 0, 24, 24);
						var d = x.getImageData(0, 0, 24, 24).data, clear = 0, solid = 0, bright = 0;
						for (var i = 0; i < d.length; i += 4) {
							if (d[i + 3] < 30) { clear++; continue; }
							solid++;
							if ((0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255 > 0.85) { bright++; }
						}
						if (clear > 40 && solid > 10 && bright / solid > 0.85) { img.style.setProperty('filter', 'brightness(0) saturate(100%)', 'important'); }
					} catch (e) { /* cross-origin image: leave it */ }
				};
				if (img.complete && img.naturalWidth) { check(); } else { img.addEventListener('load', check, { once: true }); }
			});
		} catch (err) { /* never block the page */ }
		root.classList.remove('mdm-light-pending');
	}

	/* ------------------------------------------------------------------ */
	/* Whole website: scroll reveal, progress line, page transitions       */
	/* ------------------------------------------------------------------ */

	function initSite() {
		var body = document.body;
		if (!body || !body.classList.contains('mdm-site-anim') || body.__mdm_site_done) { return; }
		body.__mdm_site_done = true;
		var root = document.documentElement;
		root.classList.add('mdm-anim');

		// Progress line
		var bar = document.querySelector('.mdm-progress');
		if (bar) {
			tickers.push(function () {
				var h = document.documentElement.scrollHeight - window.innerHeight;
				bar.style.transform = 'scaleX(' + (h > 0 ? clamp(window.pageYOffset / h, 0, 1) : 0) + ')';
			});
			requestTick();
		}

		if (reduceMotion) { return; }

		// On the homepage the original sections are shown exactly as designed (no extra effects).
		if (body.classList.contains('mdm-new-home') || body.classList.contains('home')) { initTransitions(root); return; }
		initPageReveal();
		initTransitions(root);
	}

	function initPageReveal() {
		// Scroll reveal for page content below the fold. Our own sections, the header/footer,
		// and Elementor widgets that already have their own entrance animation are skipped.
		var sel = '.elementor-widget-heading, .elementor-widget-text-editor, .elementor-widget-button, .elementor-widget-icon-box, .elementor-widget-image-box, .elementor-widget-icon-list, .elementor-widget-counter, .elementor-widget-image, .entry-content > p, .entry-content > h2, .entry-content > h3';
		// Anything that slides, scrolls sideways, sticks or animates by itself is left alone,
		// otherwise its items can stay hidden (they never "enter" the screen vertically).
		var skip = MDM_OWN + ', header, footer, .elementor-location-header, .elementor-location-footer, [data-elementor-type="header"], [data-elementor-type="footer"], .elementor-invisible, .elementor-sticky, .mdm-loader'
			+ ', .swiper, .swiper-container, .swiper-wrapper, .slick-slider, .owl-carousel, .splide, .flickity-enabled, .e-n-carousel, .elementor-image-carousel-wrapper'
			+ ', [class*="carousel"], [class*="slider"], [class*="Slider"], [class*="marquee"], [class*="ticker"], [class*="scroll"], [class*="loop"], [class*="testimonial"], [class*="logo"]'
			+ ', .elementor-widget-image-carousel, .elementor-widget-media-carousel, .elementor-widget-testimonial-carousel, .elementor-widget-reviews, .elementor-widget-n-carousel, .elementor-widget-loop-carousel, .elementor-widget-slides, .elementor-widget-video, .elementor-widget-html, .elementor-widget-shortcode';
		var vh = window.innerHeight;
		var picked = [];
		$$(sel).forEach(function (el) {
			if (picked.length > 400) { return; }
			if (el.closest(skip)) { return; }
			var ds = el.getAttribute('data-settings') || '';
			if (ds.indexOf('_animation') !== -1 || ds.indexOf('"animation"') !== -1) { return; }
			if (el.parentElement && el.parentElement.closest('.mdm-ra')) { return; } // parent already animates
			var r = el.getBoundingClientRect();
			if (r.top < vh * 0.92 || r.width < 1 || r.height < 1) { return; } // visible on load / hidden: leave it alone
			if (r.right < 0 || r.left > window.innerWidth) { return; } // off to the side (e.g. a slide)
			var cs = getComputedStyle(el);
			if (cs.position === 'absolute' || cs.position === 'fixed' || cs.animationName !== 'none' || (cs.transform && cs.transform !== 'none')) { return; }
			if (el.querySelector('.swiper, .slick-slider, [class*="carousel"], [class*="marquee"], [class*="slider"], video, iframe')) { return; }
			el.classList.add('mdm-ra');
			picked.push(el);
		});
		if ('IntersectionObserver' in window && picked.length) {
			var io = new IntersectionObserver(function (entries) {
				var batch = entries.filter(function (e) { return e.isIntersecting; });
				batch.forEach(function (e, i) {
					e.target.style.setProperty('--mdm-ra-d', Math.min(i, 5) * 0.07 + 's');
					e.target.classList.add('is-in');
					io.unobserve(e.target);
				});
			}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
			picked.forEach(function (el) { io.observe(el); });
		} else {
			picked.forEach(function (el) { el.classList.add('is-in'); });
		}

	}

	function initTransitions(root) {
		// Page transitions between pages of this site.
		var curtain = document.querySelector('.mdm-curtain');
		if (!curtain) { return; }
		window.addEventListener('pageshow', function () { root.classList.remove('mdm-leaving'); });
		// Registered on window (bubble phase) so every other click handler has already run.
		window.addEventListener('click', function (e) {
			if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) { return; }
			var a = e.target.closest && e.target.closest('a[href]');
			if (!a || a.target && a.target !== '_self' || a.hasAttribute('download')) { return; }
			var raw = a.getAttribute('href') || '';
			if (!raw || raw.charAt(0) === '#' || /^(mailto:|tel:|javascript:|sms:|whatsapp:)/i.test(raw)) { return; }
			if (a.closest('.elementor-lightbox, [data-elementor-open-lightbox="yes"], .woocommerce-product-gallery, .mdm-nav__panel') || a.hasAttribute('data-elementor-open-lightbox')) { return; }
			var url;
			try { url = new URL(a.href, location.href); } catch (err) { return; }
			if (url.origin !== location.origin) { return; }
			if (url.pathname === location.pathname && url.search === location.search) { return; } // same page / anchor
			if (/\/wp-admin|\/wp-login|add-to-cart=|\.(pdf|zip|jpg|png|mp4)$/i.test(url.href)) { return; }
			e.preventDefault();
			root.classList.add('mdm-leaving');
			setTimeout(function () { window.location.href = url.href; }, 380);
			setTimeout(function () { root.classList.remove('mdm-leaving'); }, 4000); // safety
		});
	}

	function initAll(scope) {
		scope = scope || document;
		$$('[data-mdm-reels]', scope).forEach(initReels);
		$$('[data-mdm-impact]', scope).forEach(initImpact);
		$$('[data-mdm-reveal]', scope).forEach(initReveal);
		$$('[data-mdm-cases]', scope).forEach(initCases);
		$$('[data-mdm-faq]', scope).forEach(initFaq);
		$$('[data-mdm-menu]', scope).forEach(initMenu);
		$$('[data-mdm-footer]', scope).forEach(initFooter);
		$$('[data-mdm-pricing]', scope).forEach(initPricing);
		if (!scope || scope === document) { initLight(); initSite(); }
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () { initAll(); });
	} else {
		initAll();
	}

	window.addEventListener('elementor/frontend/init', function () {
		if (window.elementorFrontend && window.elementorFrontend.hooks) {
			window.elementorFrontend.hooks.addAction('frontend/element_ready/shortcode.default', function ($scope) {
				initAll($scope && $scope[0] ? $scope[0] : document);
			});
		}
	});
})();
