//Imports
const express = require("express")
const imageCtrl = require("../controllers/images.controllers")
const upload = require("../upload")

//Set Router
const router = express.Router()

//Routes
router.route("/")
      .get(imageCtrl.get)
      .post(upload, imageCtrl.post)

router.route("/:id")
      .get(imageCtrl.get)
      .put(imageCtrl.put)
      .delete(imageCtrl.delete)

//Exports
module.exports = router