//Imports
const Album = require("../models/Album")
const Photo = require("../models/Photo")

//Controller Class
class AlbumController{

    get = async (req, res) => {
        let response;
        if(req.params.id){
            response = await Album.findById(req.params.id)
        } else {
            response = await Album.find()
        }
        res.json(response)
    }

    post = async (req, res) => {
        try{
          const {name} = req.body
          const newAlbum = new Album({name})
          await newAlbum.save()
          console.log(newAlbum)
          res.json({message: "Album Created"})
        } catch(err){
            console.log(err)
        } 
    }

    put = async (req, res) => {
        res.json({message: `Album id ${req.params.id} Created`})
    }
    
    delete = async (req, res) => {
        const deletedAlbum = await Album.findOneAndDelete(req.params.id)
        console.log("DELETED", deletedAlbum)
        res.json({message: `Deleted Image ${deletedAlbum.title}`})
    }
}

module.exports = new AlbumController()
