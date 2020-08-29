//Imports
const Image = require("../models/Image")
const upload = require("../upload")

//Controller Class
class ImageController{
    constructor(){

    }

    get = (req, res) => {
        res.json({message: "Images"})
    }

    post = (req, res) => {
        res.json({message: "Image Posted"})
        upload(req, res, (err) => {
            if(err){
                console.log(err)
            } else{
                console.log(req.file)
            }
        })
    }
}

module.exports = new ImageController()
