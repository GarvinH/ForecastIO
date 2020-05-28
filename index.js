const express = require("express")
const axios = require('axios')
const fs = require('fs')
const app = express()

const key = fs.readFileSync(__dirname + "/appid.txt", 'utf8', (err, data) => {
    if (err) {
        return console.log("error")
    }
    return data
})

const port = process.env.PORT || 3000

app.get("/forecast/city", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + req.query.city + "&appid=" + key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.send(err.response.data)
    })

})

app.get("/forecast/coord", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + req.query.lat + "&lon="+req.query.lon+"&appid="+key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.send(err.response.data)
    })
})

app.get("/current/city", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + req.query.city + "&appid=" + key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.send(err.response.data)
    })

})

app.get("/current/coord", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + req.query.lat + "&lon="+req.query.lon+"&appid="+key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.send(err.response.data)
    })
})

app.listen(port, () => console.log("server running..."))