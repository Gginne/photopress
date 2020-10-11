//Imports
const fs = require("fs")
const Photo = require("../models/Photo")

//Create image path
module.exports = async (req, res, next) => {
    const foundPhoto = await Photo.findById(req.params.photoId)
    console.log(foundPhoto)
    const path = foundPhoto.image.path
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })     
    next()
}
