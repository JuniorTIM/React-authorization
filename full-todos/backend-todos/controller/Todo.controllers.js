const Todo = require("../model/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todoControllers = {
  createTodo: async (req, res) => {
    const { text } = req.body;

    try {
      const todo = await Todo.create({
        user: req.user.id,
        text,
      });

      return res.json(todo)

    } catch (e) {
      return res.status(401).json("неверный токен");
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findById(id)

      if (todo.user.toString() === req.user.id) {
      await todo.remove()
      return res.json('Задача удалена');
      }
      return res.status(401).json({error: "Ошибка доступа"})
    } catch (e) {
      return res.status(401).json({error: "Ошибка:" + e.toString()});
    }
  },

  getTodos: async (req, res) => {
    try {
      const todo = await Todo.find();
      res.json(todo);
    } catch (err) {
      res.json({error: err.message});
    }
  },

  patchTodo: async (req, res) => {
    try {
      const data = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          completed: req.body.completed,
        },
        { new: true }
      );
      res.json(data);
    } catch (err) {
      res.json(err.message);
    }
  },
};
