//Imports
const express = require("express")
const userCtrl = require("../controllers/users.controllers")
const auth = require("../middleware/auth")

//Set Router
const router = express.Router()

//Routes

//Login
router.route("/login")
    .post(userCtrl.login)
 
//Get user data
router.route("/register")
    .post(userCtrl.register)
    
//Exports
module.exports = router