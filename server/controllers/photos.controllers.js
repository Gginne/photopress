//Imports
const Photo = require("../models/Photo")
const fs = require("fs")
const { uploadFile, removeFile, getSignedUrl } = require("../aws.client")

//Controller Class
class PhotoController{

    async get(req, res){
        let photo;

        try{
            if(req.params.photoId){
                photo = await Photo.find({author: req.user.id, _id: req.params.photoId})
            } else {
                photo = await Photo.find({author: req.user.id})    
            }
            
            photo = photo.map(p => {
                p = p.toObject()

                const key = p.image.filekey
                const expiration = 60*60
                const url = getSignedUrl(key, expiration)
                
                return {...p, src: url}
            })

            res.json(photo)
        } catch(err){
            console.log(err)
        }
    }

    async getUrl(req, res){
        const photo = await Photo.findById(req.params.photoId)

        const key = photo.image.filekey
        const expiration = 60*60
        const url = getSignedUrl(key, expiration)
        
        res.send(url)

    }

    async post(req, res){
        try{
            //Retrieve data
            const {path, filename, mimetype} = req.file
            const {title, notes, tags} = req.body
            const author = req.user.id

            //Save Image data to bucket
            try{
                await uploadFile(path, filename, mimetype)
                fs.unlinkSync(path)
                //Save Image Data to Database
                const image = {filekey: filename, mimetype}

                const newPhoto = new Photo({title, image, notes, tags, author})

                await newPhoto.save()

                res.json({message: `Photo id ${newPhoto._id} Posted`})

            } catch(s3Err){
                console.log(s3Err)
                res.status(500).json({
                    message: "Failed to save image"
                })
            };
            

        } catch(err){
            console.log(err)
            res.status(500).send({
                message: "Failed to save image"
            })
        } 
    }

    async put(req, res){
        const {title, notes} = req.body
        const update = await Photo.findByIdAndUpdate(req.params.photoId, {title, notes})
        res.json({message: `Updated Photo id ${req.params.photoId}`})
    }
    
    async delete(req, res){
        const deletedPhoto = await Photo.findByIdAndDelete(req.params.photoId)
        await removeFile(deletedPhoto.image.filekey)
        res.json({message: `Deleted Image ${deletedPhoto.title}`})
    }
}

module.exports = new PhotoController()
