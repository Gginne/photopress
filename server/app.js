//Imports
const express = require("express")
const cors = require("cors")
const path = require("path")
const photoRoutes = require("./routes/photos.routes")
const albumRoutes = require("./routes/albums.routes")

//Settup
const app = express()


//Settings
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '/../client/build')))
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.urlencoded({extended: false}))
app.use(cors())

//Routes

app.use("/api/photos", photoRoutes)
app.use("/api/albums", albumRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})


//Exports
module.exports = app