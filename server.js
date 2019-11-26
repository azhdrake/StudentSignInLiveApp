var express = require("express")
var bodyParser = require("body-parser")
var Sequelize = require("sequelize")
var api_routes = require("./routes/api.js")
var path = require("path")

db_url = process.env.DATABASE_URL

let sequelize

if (db_url) {
  sequelize = new Sequelize(db_url, {
    dialect: "postgress",
  })

  sequelize.authenticate()
    .then(() => console.log("connected to Postgress"))
    .catch(err => console.log(err))
}

else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite3"
  })
  sequelize.authenticate()
    .then(() => console.log("connected to sqlite"))
    .catch(err => console.log("error connecting", err))
}

//init Student model
let student = require("./model/student.js")(sequelize, Sequelize)

//app config
var app = express()
app.use(bodyParser.json())

//serve static files from /dist directory
app.use(express.static(path.join(__dirname, "student-sign-in/student-sign-in", "dist")))

app.use("/api", api_routes(student))

//error handelers - 404
app.use(function (req, res, next) {
  res.status(404).send("404, route not found")
})

//error handelers - server
app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500).send("Server error")
})

//starts server
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("app running on port", server.address().port)
})