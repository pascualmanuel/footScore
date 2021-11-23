const router = require("express").Router()
const APIHandler = require('../services/APIHandler.js')
const apiHandler = new APIHandler()


router.get("/", (req, res, next) => {
  res.render("index")
})

router.get("/argentina", (req, res, next) => {
  
  apiHandler.getData()
  .then(response => {
    console.log(response)
    res.render("leagues")
  })
  .catch(err => console.log(err))
})

router.get("/spain", (req, res, next) => {
  res.render("leagues")
})

module.exports = router
