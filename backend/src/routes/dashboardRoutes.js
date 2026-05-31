const express = require("express");
const router = express.Router();
const { summary } = require("../controllers/dashboardControllers");
const verifyToken = require("../middleware/authMiddleware");

router.get("/summary", summary);

module.exports = router;
