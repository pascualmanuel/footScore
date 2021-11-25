const router = require("express").Router()
//const Schema = mongoose.Schema;
const User = require('../models/User.model')
const APIHandler = require('../services/APIHandler.js')
const API = new APIHandler()

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


router.get('/team', (req, res, next) => {
  const currentUser = req.session.currentUser
  const leagueId = currentUser.league
  const teamId = currentUser.team
  const year = 2021
  const matchesNumber = 20

  const userTeamResponse = API.getUserTeam(teamId)
  const positionsResponse = API.getPositions(leagueId, year)
  const matchesResponse = API.getNextMatches(leagueId, year, matchesNumber)
  const allScorersResponse = API.getTopScorers(leagueId)

  Promise.all([positionsResponse, matchesResponse, userTeamResponse, allScorersResponse])

.then(data => {
  const [positionsResponse, matchesResponse, userTeamResponse, allScorersResponse] = data
  const standings = positionsResponse.data.response[0].league.standings[0] // TODO: queremos uno o todos los que haya?? el 'ultimo [0]
  const matches = matchesResponse.data.response
  const userTeam = userTeamResponse.data.response[0].team
  const allScorers = allScorersResponse.data.response
  const topScorers = allScorers.slice(0, 5)
  console.log(allScorers)
  
  res.render("users/my-team", {standings, matches, userTeam, topScorers })

})
  
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