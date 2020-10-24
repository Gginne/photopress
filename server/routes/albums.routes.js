//Imports
const express = require("express")
const albumCtrl = require("../controllers/albums.controllers")
const photoCtrl = require("../controllers/photos.controllers")
const auth = require("../middleware/auth")
//Set Router
const router = express.Router()

//Routes
router.route("/")
      .get(auth, albumCtrl.get) //Get all the albums
      .post(auth, albumCtrl.post) //Create a new album

router.route("/:albumId")
      .post(albumCtrl.addItem) //Add photo to albums
      .get(albumCtrl.get) //Get a specific album
      .delete(albumCtrl.delete) //Deletes the album itself

router.route("/:albumId/photos/")
      //.get(albumCtrl.getItems)

router.route("/:albumId/photos/:photoId")
      .get(photoCtrl.get)
      .delete(albumCtrl.removeItem) //Deletes photo album itself


//Exports
module.exports = router