//Imports
const Album = require("../models/Album")
const Photo = require("../models/Photo");

//Controller Class
class AlbumController{

    async get(req, res){
        let response;
        if(req.params.albumId){
            response = await Album.findById(req.params.albumId)
        } else {
            response = await Album.find({author: req.user.id})
        }
        res.json(response)
    }

    async post(req, res){
        try{
            const {name} = req.body
            const author = req.user.id
            const newAlbum = new Album({name, author})
            await newAlbum.save()
            console.log(newAlbum)
            res.json({message: "Album Created"})
        } catch(err){
            console.log(err)
        } 
    }

    async put(req, res){
        res.json({message: `Album id ${req.params.albumId} Created`})
    }
    
    async delete(req, res){
        const deletedAlbum = await Album.findOneAndDelete(req.params.albumId)
        console.log("DELETED", deletedAlbum)
        res.json({message: `Deleted Image ${deletedAlbum.title}`})
    }

    async addItem(req, res){
        const addedPhoto = await Photo.findById(req.body.photoId)
        const album = await Album.findById(req.params.albumId)
        addedPhoto.albums.push(album)
        album.photos.push(addedPhoto)
        addedPhoto.save()
        album.save()
        res.send({message: `Photo id ${addedPhoto._id} saved to album id ${album._id}`})
    }

    async removeItem(req, res){
        const removedPhoto = await Photo.findById(req.params.photoId)
        const album = await Album.findById(req.params.albumId)
        removedPhoto.albums.filter(album => album._id !== req.params.albumId)
        album.photos.filter(photo => photo._id !== req.params.photoId)
        removedPhoto.save()
        album.save()
        res.send({message: `Photo id ${removedPhoto._id} removed from album id ${album._id}`})
    }
}

module.exports = new AlbumController()
