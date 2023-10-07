//Imports
const express = require("express")
const cors = require("cors")
const path = require("path")
const photoRoutes = require("./routes/photos.routes")
const albumRoutes = require("./routes/albums.routes")
const authRoutes = require("./routes/auth.routes")
const cookieParser = require('cookie-parser')

//Settup
const app = express()


//Settings
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

//Routes
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../client/build')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})

app.use("/api", authRoutes)
app.use("/api/photos", photoRoutes)
app.use("/api/albums", albumRoutes)




//Exports
module.exports = app