const taskService = require("../services/task.service");

async function create(req, res, next) {
  try {
    const task = await taskService.createTask(req.user.userId, req.body);
    return res.status(201).json(task);
  } catch (err) {
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const result = await taskService.getMyTasks(req.user.userId, req.query);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.user.userId, req.params.id);
    return res.json(task);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const task = await taskService.updateTask(req.user.userId, req.params.id, req.body);
    return res.json(task);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const result = await taskService.deleteTask(req.user.userId, req.params.id);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
}

module.exports = { create, list, getOne, update, remove };
