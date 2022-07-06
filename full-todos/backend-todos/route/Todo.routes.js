const { Router } = require("express");

const { todoControllers } = require("../controller/Todo.controllers");
const authMiddleware = require("../model/middlewares/auth.middleware");

const router = Router();

router.get("/todos", authMiddleware, todoControllers.getTodos);
router.post("/todos", authMiddleware, todoControllers.createTodo);
router.delete("/todos/:id", authMiddleware, todoControllers.deleteTodo);
router.patch("/todos/:id", authMiddleware, todoControllers.patchTodo);

module.exports = router;
