//Imports
const express = require("express")
const upload = require("../upload")
const imageCtrl = require("../controllers/image.controller")

//Set Router
const router = express.Router()

//Routes
router.route("/")
      .get(imageCtrl.get)
      .post(imageCtrl.post)

router.route("/:id")
      .get((req, res) => res.json({message: `Image id ${req.params.id}`}))
      .put((req, res) => res.json({message: `Image id ${req.params.id} Updated`}))
      .delete((req, res) => res.json({message: `Image id ${req.params.id} Deleted`}))

//Exports
module.exports = router