const express = require("express")
const app = express()

const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")

app.engine("mst", mustacheExpress())
app.set("view engine", "mst")
app.set("views", "./views")
app.use(express.static("public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

const todos = ["Wash the car", "Do the dishes", "Clean the kitchen"]
const done = ["Sweep the floors", "Clean the toilets", "Dust the furniture"]

app.get("/", (req, res) => {
  res.render("home", { todos: todos, done: done })
})

app.post("/addToDo", (req, res) => {
  const newToDo = req.body.todo
  todos.push(newToDo)
  res.redirect("/")
})

app.post("/markComplete", (req, res) => {
  const completedTask = req.body.todo
  done.push(completedTask)

  const indexOfItem = todos.indexOf(completedTask)
  todos.splice(indexOfItem, 1)
  res.redirect("/")
})

app.listen(3000, () => {
  console.log("Listening")
})
