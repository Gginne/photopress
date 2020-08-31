//Imports
const Photo = require("../models/Photo")

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
            const {path, filename} = req.file
            const {title, notes} = req.body
            const newPhoto = new Photo({title, path, filename, notes})
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
