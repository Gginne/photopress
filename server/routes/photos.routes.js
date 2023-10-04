//Imports
const express = require("express")
const photoCtrl = require("../controllers/photos.controllers")
const upload = require("../middleware/upload")
const remove = require("../middleware/remove")
const auth = require("../middleware/auth")

//Set Router
const router = express.Router()

//Routes

router.route("/")
      .get(auth, photoCtrl.get) //getting all images associated with logged in user
      .post([auth, upload], photoCtrl.post) //posting images to user

router.route("/:photoId")
      .get(auth, photoCtrl.get)
      .put(auth, photoCtrl.put)
      .delete(auth, photoCtrl.delete)

//Exports
module.exports = router