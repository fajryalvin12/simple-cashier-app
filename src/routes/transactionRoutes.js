const express = require("express");
const router = express.Router();
const {
  create,
  selectAll,
  edit,
  remove,
} = require("../controllers/transactionControllers");
const verifyToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * /v1/transactions:
 *   post:
 *     summary: Create a new transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: List of products in transaction
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *             required:
 *               - items
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post("/", verifyToken, create);
// router.get("/", selectAll);
// router.put(`/:id`, verifyToken, edit);
// router.delete(`/:id`, verifyToken, remove);

module.exports = router;
