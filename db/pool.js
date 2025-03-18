require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('Closing database connection pool...');
  await pool.end();
  console.log('Database pool closed.');
  process.exit(0);
});

async function getClient() {
  const client = await pool.connect();
  return client;
}

module.exports = { pool, getClient };