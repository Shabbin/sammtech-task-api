const { z } = require("zod");

const allowedStatus = z.enum(["pending", "in_progress", "completed"]);

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: allowedStatus.optional(),
  dueDate: z.string().datetime("dueDate must be an ISO datetime string"),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: allowedStatus.optional(),
  dueDate: z.string().datetime().optional(),
});

module.exports = { createTaskSchema, updateTaskSchema, allowedStatus };
