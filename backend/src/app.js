require("dotenv").config();
const express = require("express");
const app = express();

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");

// global middleware
app.use(express.json());

// routes
app.use("/v1/auth", authRouter);
app.use("/v1/products", productRouter);
app.use("/v1/transactions", transactionRouter);
app.use("/v1/dashboard", dashboardRouter);

// Swagger
require("./swagger")(app); // swagger.js ada di src/

// quick check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
