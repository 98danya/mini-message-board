const db = require("./queries");

async function populate() {
  await db.createMessagesTable();
  await db.insertMessage("Admin", "Hello, world!");
  await db.insertMessage("Admin", "Welcome to the Mini Message Board.");
  console.log("Database populated!");
}

populate();