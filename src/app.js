require("dotenv").config();
const express = require("express");
const app = express();

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");

// global middleware
app.use(express.json());

// routes
app.use("/v1/auth", authRouter);
app.use("/v1/product", productRouter);

// quick check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
