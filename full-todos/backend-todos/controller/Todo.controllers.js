const Todo = require("../model/Todo.model");

module.exports.todoControllers = {
  createTodo: async (req, res) => {
    try {
    const data = await Todo.create({
      text: req.body.text,
     })
     res.json(data)
    } catch (err) {
      res.json(err.message);
    }
  },

  deleteTodo: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      res.json(req.params.id);
    } catch (err) {
      res.json(err.message);
    }
  },

  getTodos: async (req, res) => {
    try {
      const todo = await Todo.find();
      res.json(todo);
    } catch (err) {
      res.json(err.message);
    }
  },

  patchTodo: async (req, res) => {
    try {
      const data = await Todo.findByIdAndUpdate(req.params.id, {
        completed: req.body.completed,
      }, {new: true});
      res.json(data);
    } catch (err) {
      res.json(err.message);
    }
  },
};
