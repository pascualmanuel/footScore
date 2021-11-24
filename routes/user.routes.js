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

  const { username, img, country, league, team } = res.body

  res.render('/users/profile')

})

//Editar perfil del usuario
// router.get('/edit-profile', (req, res, next) => {

//   const currentUser = req.session.currentUser
//   res.render('users/edit-profile', currentUser)
// })


// router.post('/edit-profile', (req, res, next) => {
//   console.log('ENTRO TRAS ROUTER.POST y /EDIT-PROFILE');
//   const { username, email, img } = res.body
//   const currentUser = req.session.currentUser

//   User.findOneAndUpdate(currentUser, { username, email, img })
//     .then(() => res.redirect('/users/profile'))
//     .catch(err => console.log(err))

// })
module.exports = router