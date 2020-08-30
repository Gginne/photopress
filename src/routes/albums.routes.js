//Imports
const express = require("express")
const albumCtrl = require("../controllers/albums.controllers")

//Set Router
const router = express.Router()

//Routes
router.route("/")
      .get(albumCtrl.get)
      .post(albumCtrl.post)

router.route("/:id")
      .get(albumCtrl.get)
      .put(albumCtrl.put)
      .delete(albumCtrl.delete)

//Exports
module.exports = router