//Imports
const express = require("express")
const userCtrl = require("../controllers/users.controllers")
const auth = require("../middleware/auth")

//Set Router
const router = express.Router()

//Routes

//Login
router.route("/")
    .post(userCtrl.auth)
 
//Get user data
router.route("/user")
    .get(auth, userCtrl.get)
//Exports
module.exports = router