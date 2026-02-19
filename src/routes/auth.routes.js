/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               name: { type: string, example: "Test User" }
 *               email: { type: string, example: "test@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       201:
 *         description: User created with JWT token
 *       409:
 *         description: Email already in use
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "test@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Logged in successfully with JWT token
 *       401:
 *         description: Invalid credentials
 */
const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");
const { validate } = require("../utils/validate");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
