const express = require("express")
const axios = require('axios')
const fs = require('fs')
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next()
})

const key = fs.readFileSync(__dirname + "/appid.txt", 'utf8', (err, data) => {
    if (err) {
        return console.log("error")
    }
    return data
})

const port = process.env.PORT || 3000

app.get("/forecast/city", (req, res) => {
    res.header()
    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + req.query.city + "&appid=" + key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })

})

app.get("/forecast/coord", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + req.query.lat + "&lon="+req.query.lon+"&appid="+key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })
})

app.get("/current/city", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + req.query.city + "&appid=" + key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })

})

app.get("/current/coord", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + req.query.lat + "&lon="+req.query.lon+"&appid="+key).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })
})

app.listen(port, () => console.log("server running..."))