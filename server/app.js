const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
