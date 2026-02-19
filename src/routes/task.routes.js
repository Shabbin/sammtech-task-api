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
