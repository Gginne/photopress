//Imports
const express = require("express")
const photoCtrl = require("../controllers/photos.controllers")
const upload = require("../upload")
const remove = require("../middleware/remove")

//Set Router
const router = express.Router()

//Routes
router.route("/")
      .get(photoCtrl.get)
      .post(upload, photoCtrl.post)

router.route("/:id")
      .get(photoCtrl.get)
      .put(photoCtrl.put)
      .delete(remove, photoCtrl.delete)

//Exports
module.exports = router