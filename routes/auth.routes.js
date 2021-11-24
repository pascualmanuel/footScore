const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")

const APIHandler = require('../services/APIHandler.js')
const API = new APIHandler()

// Signup
router.get('/registro', (req, res) => res.render('auth/signup'))
router.post('/registro', (req, res) => {

  const { name, email, userPwd, img, country, league, team, journalist } = req.body
  console.log(req.body)
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
          res.redirect('/registro/ligas')})
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})


router.get("/registro/ligas", (req, res, next) => {
  const currentUser = req.session.currentUser
  const country = currentUser.country

  API
    .getLeagues(country)
    .then(data => {
      const leaguesResponse = data.data.response
      const leagues = leaguesResponse.map(league => {
        return {
          name: league.league.name,
          id: league.league.id
        }
      })
      console.log(leagues)
      res.render("auth/signup-leagues", {leagues})

    })
    .catch(err => {
      console.error(err);
    });

})

//Update add league on user
router.post("/registro/ligas", (req, res, next) => {

  const currentUser = req.session.currentUser
  const id = currentUser._id
  const {league} = req.body

  User
  .findByIdAndUpdate(id, { league }, {new: true})
  .then(() => { 
      res.redirect('/registro/equipo')})
      .catch(err => console.error(err));

})

router.get("/registro/equipo", (req, res, next) => {

  const currentUser = req.session.currentUser
  const leagueId = currentUser.league

  API
    .getTeam(team)
    .then(data => {
      const team = data.data.response
      const teamsName = teams.map(league => league.league.name)
      console.log(teamsName)
      res.render("auth/signup-teams", {teamsName})

    })
    .catch(err => {
      console.error(err);
    });
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
