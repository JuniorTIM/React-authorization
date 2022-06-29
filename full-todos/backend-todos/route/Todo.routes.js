const { Router } = require("express");

const { todoControllers } = require("../controller/Todo.controllers");

const router = Router();

router.get("/todos", todoControllers.getTodos);
router.post("/todos", todoControllers.createTodo);
router.delete("/todos/:id", todoControllers.deleteTodo);
router.patch("/todos/:id", todoControllers.patchTodo);

module.exports = router;
