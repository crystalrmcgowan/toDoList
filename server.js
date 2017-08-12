const express = require("express")
const app = express()

const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const expressSession = require("express-session")
const jsonfile = require("jsonfile")

app.engine("mst", mustacheExpress())
app.set("view engine", "mst")
app.set("views", "./views")
app.use(express.static("public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
)

const todos = ["Wash the car", "Do the dishes", "Clean the kitchen"]
const done = ["Sweep the floors", "Clean the toilets", "Dust the furniture"]
const todoList = jsonfile.readFileSync("todos.json")

app.get("/", (req, res) => {
  const todoList = req.session.todoList || []
  const templateData = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  }
  res.render("home", templateData)
})

app.post("/addToDo", (req, res) => {
  const todoList = req.session.todoList || []
  const descriptionForNewTodo = req.body.description
  todoList.push({
    id: todoList.length + 1,
    completed: false,
    description: descriptionForNewTodo
  })

  req.session.todoList = todoList

  res.redirect("/")
})

app.post("/markComplete", (req, res) => {
  const todoList = req.session.todoList || []
  const id = parseInt(req.body.id)
  const todo = todoList.find(todo => todo.id === id)

  if (todo) {
    todo.completed = true
    req.session.todoList = todoList
  }
  res.redirect("/")
})

app.listen(3000, () => {
  console.log("Listening")
})
