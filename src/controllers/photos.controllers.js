//Imports
const Photo = require("../models/Photo")
const fs = require("fs")

//Controller Class
class PhotoController{

    get = async (req, res) => {
        let response;
        if(req.params.photoId){
            response = await Photo.findById(req.params.photoId)
        } else {
            response = await Photo.find()
        }
        res.json(response)
    }

    post = async (req, res) => {
        try{
            const {path, filename, mimetype} = req.file
            const {title, notes} = req.body
            const buffer = fs.readFileSync(path)
            const img = {buffer, path, filename, mimetype}
            const newPhoto = new Photo({title, img, notes})
            await newPhoto.save()
            res.json({message: `Photo id ${newPhoto._id} Posted`})
            console.log(newPhoto)
            console.log(req.file)

        } catch(err){
            console.log(err)
        } 
    }

    put = async (req, res) => {
        const {title, notes} = req.body
        const update = await Photo.findOneAndUpdate(req.params.photoId, {title, notes})
        res.json({message: `Updated Photo id ${req.params.photoId}`})
    }
    
    delete = async (req, res) => {
        const deletedPhoto = await Photo.findOneAndDelete(req.params.photoId)
        console.log("DELETED", deletedPhoto)
        res.json({message: `Deleted Image ${deletedPhoto.title}`})
    }
}

module.exports = new PhotoController()
