const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // 1. Retrieve header and token first, then validate the data

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  const parts = authHeader.split(" ");
  const headerLength = parts.length === 2;
  const headerFormat = parts[0] === "Bearer";

  if (!headerFormat || !headerLength) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const token = parts[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  // 2. Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token!" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken();
