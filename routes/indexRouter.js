const { Router } = require("express");

const indexRouter = Router();

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() }
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "mini messageboard", messages });
});

indexRouter.post("/new", (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).send("Author and message text are required!");
  }

  messages.push({ text, user: author, added: new Date() });

  res.redirect("/");
});

indexRouter.get("/message/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages[messageId];

  if (!message) {
    return res.status(404).send("Message not found!");
  }

  res.render("message", { title: "message details", message });
});

module.exports = indexRouter;