const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Create new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully create new account
 */

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Login account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */

router.post("/register", register);
router.post("/login", login);

module.exports = router;
