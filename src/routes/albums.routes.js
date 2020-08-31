//Imports
const express = require("express")
const albumCtrl = require("../controllers/albums.controllers")
const photoCtrl = require("../controllers/photos.controllers")

//Set Router
const router = express.Router()

//Routes
router.route("/")
      .get(albumCtrl.get) //Get all the albums
      .post(albumCtrl.post) //Create a new album

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