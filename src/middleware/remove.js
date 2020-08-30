//Imports
const fs = require("fs")
const path = require("path")
const Photo = require("../models/Photo")

//Create image path
module.exports = async (req, res, next) => {
    const foundPhoto = await Photo.findById(req.params.id)
    const path = foundPhoto.path
    await fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })     
    next()
}
