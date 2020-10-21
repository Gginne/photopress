//Imports
const express = require("express")
const userCtrl = require("../controllers/users.controllers")

//Set Router
const router = express.Router()

//Routes

//Register
router.route("/")
      .post(userCtrl.post)
      

//Exports
module.exports = router