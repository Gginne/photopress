//Imports
const Photo = require("../models/Photo")

//Controller Class
class PhotoController{

    get = async (req, res) => {
        let response;
        if(req.params.id){
            response = await Photo.findById(req.params.id)
        } else {
            response = await Photo.find()
        }
        res.json(response)
    }

    post = async (req, res) => {
        try{
            const image_path = req.file.path
            const {title, notes} = req.body
            const newPhoto = new Photo({title, image_path, notes})
            await newPhoto.save()
            res.json({message: `Photo id ${newPhoto._id} Posted`})
            console.log(newPhoto)

        } catch(err){
            console.log(err)
        } 
    }

    put = async (req, res) => {
        const {title, notes} = req.body
        const update = await Photo.findOneAndUpdate(req.params.id, {title, notes})
        res.json({message: `Updated Photo id ${req.params.id}`})
    }
    
    delete = async (req, res) => {
        const deletedPhoto = await Photo.findOneAndDelete(req.params.id)
        console.log("DELETED", deletedPhoto)
        res.json({message: `Deleted Image ${deletedPhoto.title}`})
    }
}

module.exports = new PhotoController()
