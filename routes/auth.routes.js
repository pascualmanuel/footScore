const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")

const APIHandler = require('../services/APIHandler.js')
const API = new APIHandler()

// Signup
router.get('/registro', (req, res) => res.render('auth/signup'))
router.post('/registro', (req, res) => {

  const { name, email, userPwd, img, country, league, team, journalist } = req.body

  if (userPwd.length === 0 || email.length === 0) {      
    res.render('auth/signup', { errorMsg: 'Rellena todos los campos' })
    return
  }
    
    User
    .findOne({ email })
    .then(user => {

      if (user) {                  
        res.render('auth/signup', { errorMsg: 'Email ya registrado' })
        return
      }

      const bcryptSalt = 10
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(userPwd, salt)    

      User
        .create({ email, name, password: hashPass, img, country, league, team, journalist})         
        .then(user => {
          req.session.currentUser = user
          res.redirect('/registro/liga')})
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})


router.get("/registro/liga", (req, res, next) => {
  const currentUser = req.session.currentUser
  const country = currentUser.country

  const leagueResponse = API.getLeagues(country)

  .then(data => {
    console.log(data);
    // const leagues = leagueResponse.data
    //  console.log(leagues);


  })
  .catch(err => {
    console.error(err);
  });


  // const leagues = leagueResponse
  // console.log(leagues)
  // traer la api a esta pagina, llamarla para traer todas las ligas de un pais
  res.render("index")
})

router.get("/registro/equipo", (req, res, next) => {

  // const currentUser = req.session.currentUser
  // const country = currentUser.country

  // // traer la api a esta pagina, llamarla para traer todas las ligas de un pais
  // res.render("index")
})

// Login
router.get('/iniciar-sesion', (req, res) => res.render('auth/login'))
router.post('/iniciar-sesion', (req, res) => {

  const { email, userPwd } = req.body

  if (userPwd.length === 0 || email.length === 0) {     
    res.render('auth/login', { errorMsg: 'Rellena los campos' })
    return
  }

  User
    .findOne({ email })
    .then(user => {

      if (!user) {
        res.render('auth/login', { errorMsg: 'Usuario no reconocido' })
        return
      }

      if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/login', { errorMsg: 'Contraseña incorrecta' })
        return
      }

      req.session.currentUser = user
      res.redirect('/')
    })
    .catch(err => console.log(err))

})


// Logout
router.get('/cerrar-sesion', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})

module.exports = router
