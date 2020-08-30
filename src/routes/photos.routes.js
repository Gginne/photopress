//Imports
const express = require("express")
const photoCtrl = require("../controllers/photos.controllers")
const upload = require("../upload")

//Set Router
const router = express.Router()

//Routes
router.route("/")
      .get(photoCtrl.get)
      .post(upload, photoCtrl.post)

router.route("/:id")
      .get(photoCtrl.get)
      .put(photoCtrl.put)
      .delete(photoCtrl.delete)

//Exports
module.exports = router