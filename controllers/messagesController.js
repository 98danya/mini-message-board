const db = require("../db/queries");

async function getMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("messages", { messages });
}

async function createMessage(req, res) {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).send("Author and message text are required!");
  }

  await db.insertMessage(author, content);
  res.redirect("/messages");
}

module.exports = {
  getMessages,
  createMessage,
};