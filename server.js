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
  res.render("home", { todos: todos })
})

app.post("/", (req, res) => {
  todos.push(req.body.done)
  res.redirect("/")
})

app.listen(3000, () => {
  console.log("Listening")
})
