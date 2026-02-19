/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, dueDate]
 *             properties:
 *               title: { type: string, example: "Finish assignment" }
 *               description: { type: string, example: "Implement CRUD endpoints" }
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 example: pending
 *               dueDate: { type: string, example: "2026-03-01T10:00:00.000Z" }
 *     responses:
 *       201:
 *         description: Task created
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all tasks of the authenticated user (supports pagination & status filter)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10 }
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a single task by ID (must belong to user)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Task returned
 *       404:
 *         description: Task not found
 *
 *   patch:
 *     summary: Update a task by ID (must belong to user)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *               dueDate: { type: string }
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 *
 *   delete:
 *     summary: Delete a task by ID (must belong to user)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
const router = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");
const { validate } = require("../utils/validate");
const { createTaskSchema, updateTaskSchema } = require("../validators/task.validator");
const ctrl = require("../controllers/task.controller");

router.use(auth);

// CRUD
router.post("/", validate(createTaskSchema), ctrl.create);
router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);
router.patch("/:id", validate(updateTaskSchema), ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
