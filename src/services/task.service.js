const prisma = require("../config/prisma");

function ensureFutureDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) {
    const err = new Error("Invalid dueDate");
    err.status = 400;
    throw err;
  }
  if (d <= new Date()) {
    const err = new Error("Due date must be a future date");
    err.status = 400;
    throw err;
  }
  return d;
}

async function createTask(userId, data) {
  const dueDate = ensureFutureDate(data.dueDate);

  return prisma.task.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
      status: data.status || "pending",
      dueDate,
    },
  });
}

async function getMyTasks(userId, query) {
  const page = Math.max(parseInt(query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || "10", 10), 1), 100);
  const status = query.status;

  const where = { userId, ...(status ? { status } : {}) };

  const [items, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    items,
  };
}

async function getTaskById(userId, taskId) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  return task;
}

async function updateTask(userId, taskId, data) {
  // ensures ownership + existence
  await getTaskById(userId, taskId);

  const updateData = { ...data };
  if (updateData.dueDate) updateData.dueDate = ensureFutureDate(updateData.dueDate);

  return prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });
}

async function deleteTask(userId, taskId) {
  await getTaskById(userId, taskId);

  await prisma.task.delete({ where: { id: taskId } });
  return { message: "Task deleted" };
}

module.exports = { createTask, getMyTasks, getTaskById, updateTask, deleteTask };
