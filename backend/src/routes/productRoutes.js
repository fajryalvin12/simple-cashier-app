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
 *   post:
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []   # JWT auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /v1/products/{id}:
 *   put:
 *     summary: Edit an existing product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *   delete:
 *     summary: Delete a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
router.get("/", selectAll);
router.put(`/:id`, verifyToken, edit);
router.delete(`/:id`, verifyToken, remove);

module.exports = router;
