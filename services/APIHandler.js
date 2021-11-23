const axios = require('axios')

class APIHandler {
    constructor () {
        //Tabla de Posiciones
        this.axiosApp = axios.create({
            baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
            headers: {
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                'x-rapidapi-key': '975516392emsh98060eac057ae16p1dbff7jsn0e161d214d7b'
            }
        })
    }
  
  
    getData = (id, season) => this.axiosApp.get('/leagues?country=Argentina')

}

module.exports = APIHandler