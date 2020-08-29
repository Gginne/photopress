//Imports
const express = require("express")
const cors = require("cors")

//Settup
const app = express()


//Settings
app.set('port', process.env.PORT || 4000)

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//Routes
app.get("/", (res, req) => {
    res.send("HOME")
})

//Exports
module.exports = app