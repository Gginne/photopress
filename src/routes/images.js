//Imports
const express = require("express")
const router = express.Router()

//Routes
router.route("/")
      .get((req, res) => res.json({message: "Images"}))
      .post((req, res) => res.json({message: "Image Created"}))

router.route("/:id")
      .get((req, res) => res.json({message: `Image id ${req.params.id}`}))
      .put((req, res) => res.json({message: `Image id ${req.params.id} Updated`}))
      .delete((req, res) => res.json({message: `Image id ${req.params.id} Deleted`}))

//Exports
module.exports = router