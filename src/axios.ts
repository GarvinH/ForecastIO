import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://forecast-io-server.herokuapp.com'
})

export default instance