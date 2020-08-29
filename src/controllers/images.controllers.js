//Imports
const Image = require("../models/Image")

//Controller Class
class ImageController{

    get = async (req, res) => {
        let response;
        if(req.params.id){
            response = await Image.findById(req.params.id)
        } else {
            response = await Image.find()
        }
        res.json(response)
    }

    post = async (req, res) => {
        try{
            const image_path = req.file.path
            const {title, notes} = req.body
            const newImage = new Image({title, image_path, notes})
            await newImage.save()
            res.json({message: `Image id ${newImage._id} Posted`})
            console.log(newImage)

        } catch(err){
            console.log(err)
        } 
    }

    put = async (req, res) => {
        const {title, notes} = req.body
        const update = await Image.findOneAndUpdate(req.params.id, {title, notes})
        res.json({message: `Updated Image id ${req.params.id}`})
    }
    
    delete = async (req, res) => {
        const deletedImage = await Image.findOneAndDelete(req.params.id)
        console.log("DELETED", deletedImage)
        res.json({message: `Deleted Image ${deletedImage.title}`})
    }
}

module.exports = new ImageController()
