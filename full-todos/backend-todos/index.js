const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");

const app = express();
app.use(cors())
app.use(express.json())

app.use(require('./route/Todo.routes'))

const port = 4000;

mongoose
  .connect(
    "mongodb+srv://JuniorTIM:03032004Asum@cluster0.kzst7.mongodb.net/Todos?retryWrites=true&w=majority"
  )
  .then(() => console.log("Успешно соединились с MongoDB"))
  .catch(() => console.log("Ошибка при соединии с сервером"));

app.listen(port, () => {
  console.log("Server is working");
});