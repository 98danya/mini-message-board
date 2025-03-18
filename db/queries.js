const pool = require("./pool");

async function createMessagesTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      author TEXT NOT NULL,  -- Added author column
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
}

async function insertMessage(author, content) {
    const query = `
      INSERT INTO messages (author, content)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const result = await pool.query(query, [author, content]);
    return result.rows[0].id;
  }

async function getAllMessages() {
  const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
  return result.rows;
}

async function getMessageById(id) {
    const query = "SELECT * FROM messages WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
  
  module.exports = {
    createMessagesTable,
    insertMessage,
    getAllMessages,
    getMessageById,
  };