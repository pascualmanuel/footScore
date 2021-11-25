const router = require("express").Router()
const { populate } = require("../models/User.model")
//const Schema = mongoose.Schema;
const User = require('../models/User.model')
const Article = require('../models/Article.model')
const APIHandler = require('../services/APIHandler.js')
const API = new APIHandler()
const multer = require('multer');
const fileUploader = require('../config/cloudinary.config');

//CREAR UNA NOTICIA
//Ir a la página de crear noticia:
router.get("/write-new", (req, res, next) => {
    res.render("users/write-new")
})

router.post("/write-new", fileUploader.single("img"), (req, res, next) => {

    const { headline, comment, date, img } = req.body;
    const currentUser = req.session.currentUser
    const author = currentUser


    API.getUserTeam(currentUser.team)
        .then(data => {
            const team = data.data.response[0].team.name
            Article.create({ author, headline, comment, date, img: req.file.path, team })
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.post('/leagues', (req, res, next) => {
    const { headline, author, comment, img, data } = req.body
    Article.create({ headline, author, comment, img, data })
        .then(() => res.render('/'))
        .catch(err => console.log(err))


})
module.exports = router