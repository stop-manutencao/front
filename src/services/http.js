import axios from 'axios'

// LOCAL
var apiServer = process.env.API_SERVER || `http://localhost`
var port = process.env.API_PORT || '3000'

// AGES HOMOLOGAÇÃO
// var apiServer = 'http://www.hml.ages.pucrs.br'
// var port = '5100'

const baseURL = `${apiServer}:${port}`

const client = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  validateStatus: function() { return true }
})

export default {
  client,
  baseURL
}

