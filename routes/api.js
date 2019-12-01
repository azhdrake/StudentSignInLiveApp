var express = require("express")
var Sequelize = require("sequelize")

module.exports = function (Student) {
  var router = express.Router()

  router.get("/students", function (req, res, next) {
    //From context this is clearly a SELECT * FROM students statement but I'm not sure how it translates into that. Could we at some point talk about how sequelize statements work in JavaScript?
    Student.findAll({ order: ["name"] }).then(students => {
      return res.json(students)
    }).catch(err=>next(err))
  })

  router.post("/students", function (req, res, next) {
    //INSERT INTO STUDENTS (student). Still not really sure how this works. what is (req.body)? Like obviouly it's the student data, but how?
    Student.create(req.body).then((data) => {
      return res.status(201).send("ok")
    }).catch(err => {
      if (err instanceof Sequelize.ValidationError) {
        let messages = err.errors.map((e) => e.message)
        return res.status(500).json(messages)
      }
      return next(err)
    })
  })

  router.patch("/students/:id", function (req, res, next) {
    //UPDATE students where ID = id. 
    Student.update(
      req.body, { where: { id: req.params.id } })
      .then((rowsModified) => {
        return res.send("ok")
      })
  })

  router.delete("/students/:id", function (req, res, next) {
    //DELETE FROM students WHERE ID = id
    Student.destroy({ where: { id: req.params.id } }).then(() => {
      return res.send("ok")
    }).catch(err => next(err))

  })

  return router
}