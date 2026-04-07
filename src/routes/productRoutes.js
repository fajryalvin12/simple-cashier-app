const express = require("express");
const router = express.Router();
const {
  create,
  selectAll,
  edit,
  remove,
} = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * /v1/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 */

router.post("/", verifyToken, create);
router.get("/", selectAll);
router.put(`/:id`, verifyToken, edit);
router.delete(`/:id`, verifyToken, remove);

module.exports = router;
