const router = require("express").Router()
const { populate } = require("../models/User.model")
//const Schema = mongoose.Schema;
const User = require('../models/User.model')
const Article = require('../models/Article.model')
const APIHandler = require('../services/APIHandler.js')
const API = new APIHandler()
const multer = require('multer');
const fileUploader = require('../config/cloudinary.config');

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
  const playersTeamResponse = API.getTeamPlayers(teamId)
  const teamCoachResponse = API.getTeamCoach(teamId)
  const lastTeamMatchesResponse = API.getLastMatches(leagueId, teamId)
  const teamInfoResponse = API.getTeamInfo(teamId)


  Promise.all([positionsResponse, matchesResponse, userTeamResponse, allScorersResponse, playersTeamResponse, teamCoachResponse, lastTeamMatchesResponse, teamInfoResponse ])

.then(data => {
  const [positionsResponse, matchesResponse, userTeamResponse, allScorersResponse, playersTeamResponse, teamCoachResponse, lastTeamMatchesResponse, teamInfoResponse] = data
  const standings = positionsResponse.data.response[0].league.standings[0] // TODO: queremos uno o todos los que haya?? el 'ultimo [0]
  const matches = matchesResponse.data.response
  const userTeam = userTeamResponse.data.response[0].team
  const allScorers = allScorersResponse.data.response
  const topScorers = allScorers.slice(0, 5)
  const teamPlayers = playersTeamResponse.data.response[0].players
  const teamCoach = teamCoachResponse.data.response[0]
  const lastMatches = lastTeamMatchesResponse.data.response
console.log(lastMatches)
  // const lastMatchesDate = lastMatches.slice(0, -9);
  const teamInfo = userTeamResponse.data.response[0]

  console.log(teamInfo)
  res.render("users/my-team", {standings, matches, userTeam, topScorers, teamPlayers, teamCoach, lastMatches, teamInfo  })
})
  
})



//Editar perfil del usuario
router.get('/edit-profile', (req, res, next) => {

  const currentUser = req.session.currentUser
  res.render('users/edit-profile', currentUser)
})

router.post('/edit-profile', fileUploader.single("img"), (req, res, next) => {

  const { name, email, journalist } = req.body
  const currentUserId = req.session.currentUser._id

  User.findByIdAndUpdate(currentUserId, { name, email, img: req.file.path }, { new: true })
    .then(updatedUser => {
      req.session.currentUser = updatedUser
      res.redirect('/users/profile')
    })
    .catch(err => console.log(err))

})

module.exports = router
