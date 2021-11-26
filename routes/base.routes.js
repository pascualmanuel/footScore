const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middlewares")
const APIHandler = require('../services/APIHandler.js')
const API = new APIHandler()


router.get("/", (req, res, next) => {

  res.render("index")
})

router.get("/league/:country", (req, res, next) => {

  const { country} = req.params

  const leagueMapper = {
    'spain': 140,
    'argentina': 128,
    'england': 39,
    'italy': 135,
    'france': 61,
    'germany': 78
  }

  let leagueId = leagueMapper[country]
  const year = 2021
  const matchesNumber = 20

  const positionsResponse = API.getPositions(leagueId, year)
  const matchesResponse = API.getNextMatches(leagueId, year, matchesNumber)
  const allScorersResponse = API.getTopScorers(leagueId)



  Promise.all([positionsResponse, matchesResponse, allScorersResponse])
    .then(data => {
      const [positionsResponse, matchesResponse, allScorersResponse] = data
      const standings = positionsResponse.data.response[0].league.standings[0] // TODO: queremos uno o todos los que haya?? el 'ultimo [0]
      const matches = matchesResponse.data.response
      console.log(matches[0].fixture.venue.name)
      const allScorers = allScorersResponse.data.response
      const topScorers = allScorers.slice(0, 10)
      res.render("leagues", {standings, matches, topScorers, isLoggedIn: !!req.session.currentUser })
      //!! Conversion a Boolean
      
    })
  .catch(err => console.log(err))
})

router.get("/champions-league", isLoggedIn, (req, res, next) => {

  const champions = API.getChampionsLeague()
  
  .then(response => {

    const championsLeagueName = response.data.response[0].league.name
    const championsLeagueStanding = response.data.response[0].league.standings
    // console.log(response.data.response[0].league.standings[0])
    res.render("champions-league", {championsLeagueName, championsLeagueStanding })

  })
  .catch(err => {
    console.error(err);
  });

})

  module.exports = router
