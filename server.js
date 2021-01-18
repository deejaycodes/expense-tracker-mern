const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDB();

const transactions = require("./routes/transactions");

const app = express();
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));
app.use(express.json());

app.use("/api/v1/transactions", transactions);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
