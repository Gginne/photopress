//Imports
const multer = require("multer")
const path = require("path")
const uuid = require('uuid');

//Set multer storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../tmp"),

    filename: function(req, file, cb){
      
        cb(null, uuid.v4());
        
      }
})

module.exports = multer({storage: storage}).single("image")