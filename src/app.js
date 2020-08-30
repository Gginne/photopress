//Imports
const express = require("express")
const cors = require("cors")

const photoRoutes = require("./routes/photos.routes")
const albumRoutes = require("./routes/albums.routes")

//Settup
const app = express()


//Settings
app.set('port', process.env.PORT || 4000)
app.set('view engine', 'ejs')

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//Routes
app.get("/", (req, res) => {
    res.redirect("/api/photos")
})

app.use("/api/photos", photoRoutes)
app.use("/api/albums", albumRoutes)

//Exports
module.exports = app