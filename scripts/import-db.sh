#!/bin/bash
set -euo pipefail

SQL_FILE="${1:-dbodkg0wg785mq.sql}"
MYSQL_HOST="${MYSQL_HOST:-sakura.proxy.rlwy.net}"
MYSQL_PORT="${MYSQL_PORT:-36436}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_DATABASE="${MYSQL_DATABASE:-railway}"

if [[ -z "${MYSQL_PASSWORD:-}" ]]; then
  echo "Set MYSQL_PASSWORD first, then rerun:"
  echo "  export MYSQL_PASSWORD='your-railway-mysql-password'"
  echo "  ./scripts/import-db.sh"
  exit 1
fi

if [[ ! -f "$SQL_FILE" ]]; then
  echo "SQL file not found: $SQL_FILE"
  exit 1
fi

MYSQL_BIN="${MYSQL_BIN:-mysql}"
if ! command -v "$MYSQL_BIN" >/dev/null 2>&1; then
  echo "mysql client not found."
  echo "Install with: brew install mysql-client"
  echo "Then add to PATH:"
  echo '  export PATH="/opt/homebrew/opt/mysql-client/bin:$PATH"'
  exit 1
fi

echo "Importing $SQL_FILE into $MYSQL_DATABASE on $MYSQL_HOST:$MYSQL_PORT ..."
"$MYSQL_BIN" \
  --host="$MYSQL_HOST" \
  --port="$MYSQL_PORT" \
  --user="$MYSQL_USER" \
  --password="$MYSQL_PASSWORD" \
  --protocol=TCP \
  --database="$MYSQL_DATABASE" < "$SQL_FILE"

echo "Updating WordPress site URLs ..."
"$MYSQL_BIN" \
  --host="$MYSQL_HOST" \
  --port="$MYSQL_PORT" \
  --user="$MYSQL_USER" \
  --password="$MYSQL_PASSWORD" \
  --protocol=TCP \
  --database="$MYSQL_DATABASE" <<'SQL'
UPDATE dbj_options
SET option_value = 'https://romantic-spirit-production-35e5.up.railway.app'
WHERE option_name IN ('siteurl', 'home');
SQL

echo "Done. Open https://romantic-spirit-production-35e5.up.railway.app"
