const router = require("express").Router()
//const Schema = mongoose.Schema;
const User = require('../models/User.model')


router.get("/", (req, res, next) => {
  res.render("index")
})

//visualizar perfil del usuario
router.get('/profile', (req, res, next) => {
  const currentUser = req.session.currentUser
  res.render('users/profile', currentUser)
})

router.post('/profile', (req, res, next) => {

  const { name, img, country, league, team } = res.body

  res.render('/users/profile')

})

//Editar perfil del usuario
router.get('/edit-profile', (req, res, next) => {

  const currentUser = req.session.currentUser
  res.render('users/edit-profile', currentUser)
})

router.post('/edit-profile', (req, res, next) => {

  const { name, email, img } = req.body
  const currentUserId = req.session.currentUser._id

  User.findByIdAndUpdate(currentUserId, { name, email, img }, { new: true })
    .then(updatedUser => {
      req.session.currentUser = updatedUser
      res.redirect('/users/profile')
    })
    .catch(err => console.log(err))

})


//CREAR UNA NOTICIA
//Ir a la página de crear noticia:
router.get("/write-new", (req, res, next) => {
  //Verificar que se ha marcado como un periodista
  res.render("users/write-new")
})

module.exports = router