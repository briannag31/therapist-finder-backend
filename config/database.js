// Database Connection
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db
  .on("open", () => console.log(`Connected to MongoDB on ${db.host}:${db.port}`))
  .on("close", () => console.log("Connection Closed"))
  .on("error", (error) => console.log(error));
