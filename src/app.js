//Imports
const express = require("express")
const cors = require("cors")

const imageRoutes = require("./routes/images.routes.js")

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
    res.redirect("/api/images")
})

app.use("/api/images", imageRoutes)

//Exports
module.exports = app