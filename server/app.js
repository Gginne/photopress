//Imports
const express = require("express")
const cors = require("cors")
const path = require("path")
const photoRoutes = require("./routes/photos.routes")
const albumRoutes = require("./routes/albums.routes")
const userRoutes = require("./routes/users.routes")
const authRoutes = require("./routes/auth.routes")

//Settup
const app = express()


//Settings
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '/../client/build')))
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Routes

app.use("/api/photos", photoRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build'))
})


//Exports
module.exports = app