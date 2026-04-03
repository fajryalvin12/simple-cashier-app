require("dotenv").config();
const express = require("express");
const app = express();

const authRouter = require("./routes/authRoutes");

// global middleware
app.use(express.json());

// routes
app.use("/v1/auth", authRouter);

// quick check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
