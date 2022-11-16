//Imports
const Photo = require("../models/Photo")
const fs = require("fs")
const { uploadFile } = require("../awsClient")

//Controller Class
class PhotoController{

    async get(req, res){
        let photo;
        try{
            if(req.params.photoId){
                photo = await Photo.findById(req.params.photoId)
            } else {
                photo = await Photo.find({author: req.user.id})    
            }
            res.json(photo)
        } catch(err){
            console.log(err)
        }
    }

    async render(req, res){
        const photo = await Photo.findById(req.params.photoId)
        res.setHeader('content-type', photo.image.mimetype);
        res.send(photo.image.buffer);
    }

    async post(req, res){
        try{
            //Retrieve data
            const {path, filename, mimetype} = req.file
            console.log(req.file)
            const {title, notes, tags} = req.body
            const author = req.user.id
            //Save Image data to bucket
            const buffer = fs.readFileSync(path)
            uploadFile(path, filename)
            fs.unlinkSync(path)
            //Save Image Data to Database
            const image = {buffer, path, filename, mimetype}
            const newPhoto = new Photo({title, image, notes, tags, author})
            await newPhoto.save()
            res.json({message: `Photo id ${newPhoto._id} Posted`})
            console.log(newPhoto)
            console.log(req.file)

        } catch(err){
            console.log(err)
        } 
    }

    async put(req, res){
        const {title, notes} = req.body
        const update = await Photo.findByIdAndUpdate(req.params.photoId, {title, notes})
        res.json({message: `Updated Photo id ${req.params.photoId}`})
    }
    
    async delete(req, res){
        const deletedPhoto = await Photo.findByIdAndDelete(req.params.photoId)
        res.json({message: `Deleted Image ${deletedPhoto.title}`})
    }
}

module.exports = new PhotoController()
