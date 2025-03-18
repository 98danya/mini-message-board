const { Router } = require("express");
const indexRouter = Router();
const db = require("../db/queries");

indexRouter.get("/", async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { title: "mini messageboard", messages });
});

indexRouter.post("/new", async (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).send("Author and message text are required!");
  }

  const newMessageId = await db.insertMessage(author, text);
  res.redirect(`/message/${newMessageId}`);
});

indexRouter.get("/message/:id", async (req, res) => {
  const messageId = parseInt(req.params.id);

  if (isNaN(messageId)) {
    return res.status(400).send("Invalid message ID!");
  }

  const message = await db.getMessageById(messageId);

  if (!message) {
    return res.status(404).send("Message not found!");
  }

  res.render("message", { title: "Message Details", message });
});

module.exports = indexRouter;