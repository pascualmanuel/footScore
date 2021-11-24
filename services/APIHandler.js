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
  
  // get new matches le damos 3 params, para buscar en la API
    getNextMatches = (leagueId, year, matchesNumber) => this.axiosApp.get(`fixtures?league=${leagueId}&season=${year}&next=${matchesNumber}`)

    getPositions = (leagueId, year) => this.axiosApp.get(`standings?league=${leagueId}&season=${year}`)

    getLeagues = (country) => this.axiosApp.get(`leagues?country=${country}`)
}

module.exports = APIHandler