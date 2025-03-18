const { pool, getClient } = require("./pool");

async function createMessagesTable() {
  const client = await getClient();
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await client.query(query);
  } finally {
    client.release();
  }
}

async function insertMessage(author, content) {
  const client = await getClient();
  try {
    const query = `
      INSERT INTO messages (author, content)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const result = await client.query(query, [author, content]);
    return result.rows[0].id;
  } finally {
    client.release();
  }
}

async function getAllMessages() {
  const client = await getClient();
  try {
    const result = await client.query("SELECT * FROM messages ORDER BY created_at DESC");
    return result.rows;
  } finally {
    client.release();
  }
}

async function getMessageById(id) {
  const client = await getClient();
  try {
    const query = "SELECT * FROM messages WHERE id = $1";
    const result = await client.query(query, [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

module.exports = {
  createMessagesTable,
  insertMessage,
  getAllMessages,
  getMessageById,
};