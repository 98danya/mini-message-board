const { Router } = require("express");

const newMessageRouter = Router();

newMessageRouter.get("/", (req, res) => {
    res.render("form",  { title: "New Message" });
});

module.exports = newMessageRouter;
