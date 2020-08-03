const express = require("express")
const axios = require('axios')
require("dotenv").config()
const app = express()
const path = require("path")

const publicPath = path.join(__dirname, "build")

const port = process.env.PORT || 3000

app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")))

app.use("/", express.static(publicPath))

app.post("/forecast/city", (req, res) => {
    res.header()
    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + req.query.city + "&appid=" + process.env.APP_ID).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })

})

app.post("/forecast/coord", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + req.query.lat + "&lon="+req.query.lon+"&appid="+process.env.APP_ID).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })
})

app.post("/current/city", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + req.query.city + "&appid=" + process.env.APP_ID).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })

})

app.post("/current/coord", (req, res) => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + req.query.lat + "&lon="+req.query.lon+"&appid="+process.env.APP_ID).then(resp => {
        res.send(resp.data)
    }).catch(err => {
        res.status(err.response.data.cod).send({message: err.response.data.message})
    })
})

app.listen(port, () => console.log("server running..."))