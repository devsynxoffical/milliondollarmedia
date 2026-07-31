import fs from 'node:fs';
import mysql from 'mysql2/promise';

const sqlFile = process.argv[2] ?? '../dbodkg0wg785mq.sql';
const mysqlUrl = process.env.MYSQL_URL;
const siteUrl =
  process.env.WP_SITE_URL ??
  'https://romantic-spirit-production-35e5.up.railway.app';

if (!mysqlUrl) {
  console.error('Missing MYSQL_URL environment variable.');
  process.exit(1);
}

if (!fs.existsSync(sqlFile)) {
  console.error(`SQL file not found: ${sqlFile}`);
  process.exit(1);
}

function splitSqlStatements(sql) {
  const statements = [];
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const next = sql[i + 1];

    if (inString) {
      current += char;
      if (char === '\\') {
        current += next ?? '';
        i++;
        continue;
      }
      if (char === stringChar) {
        inString = false;
      }
      continue;
    }

    if (char === "'" || char === '"') {
      inString = true;
      stringChar = char;
      current += char;
      continue;
    }

    if (char === ';') {
      const stmt = current.trim();
      if (stmt) {
        statements.push(stmt);
      }
      current = '';
      continue;
    }

    current += char;
  }

  const tail = current.trim();
  if (tail) {
    statements.push(tail);
  }

  return statements;
}

const parsed = new URL(mysqlUrl);
const connection = await mysql.createConnection({
  host: parsed.hostname,
  port: Number(parsed.port || 3306),
  user: decodeURIComponent(parsed.username),
  password: decodeURIComponent(parsed.password),
  database: parsed.pathname.replace(/^\//, ''),
  multipleStatements: false,
  connectTimeout: 60000,
});

console.log('Preparing database ...');
await connection.query('SET FOREIGN_KEY_CHECKS = 0');
await connection.query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'");

const [tables] = await connection.query('SHOW TABLES');
for (const row of tables) {
  const tableName = Object.values(row)[0];
  await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``);
}

console.log(`Reading ${sqlFile} ...`);
const sql = fs.readFileSync(sqlFile, 'utf8');
const statements = splitSqlStatements(sql);
console.log(`Executing ${statements.length} SQL statements ...`);

let completed = 0;
for (const statement of statements) {
  const preview = statement.slice(0, 80).replace(/\s+/g, ' ');

  try {
    await connection.query(statement);
  } catch (error) {
    console.error(`Failed at statement ${completed + 1}: ${preview}`);
    throw error;
  }

  completed++;
  if (completed % 100 === 0) {
    console.log(`Progress: ${completed}/${statements.length}`);
  }
}

console.log('Import complete.');

console.log(`Updating siteurl/home to ${siteUrl} ...`);
await connection.query(
  `UPDATE dbj_options SET option_value = ? WHERE option_name IN ('siteurl', 'home')`,
  [siteUrl]
);

await connection.query('SET FOREIGN_KEY_CHECKS = 1');
await connection.end();
console.log('Done.');
