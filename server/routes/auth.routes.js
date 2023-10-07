//Imports
const express = require("express")
const userCtrl = require("../controllers/users.controllers")
const auth = require("../middleware/auth")

//Set Router
const router = express.Router()

//Routes

//Login user
router.route("/login")
    .post(userCtrl.login)
 
//Register user
router.route("/register")
    .post(userCtrl.register)

//Refresh access token
router.route("/refresh")
    .post(userCtrl.refresh)

//Clear refresh token
router.route("/logout")
    .post(userCtrl.logout)
    
//Exports
module.exports = router