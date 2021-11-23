const axios = require('axios')

class APIHandler {
    constructor () {
        //Tabla de Posiciones
        this.axiosApp = axios.create({
            baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
            headers: {
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                'x-rapidapi-key': process.env.API_KEY
            }
        })
    }
  
  
    getNextMatches = (leagueId, year, matchesNumber) => this.axiosApp.get(`fixtures?league=${leagueId}&season=${year}&next=${matchesNumber}`)

    getPositions = (leagueId, year) => this.axiosApp.get(`standings?league=${leagueId}&season=${year}`)

}

module.exports = APIHandler