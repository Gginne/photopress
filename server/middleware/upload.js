//Imports
const multer = require("multer")
const path = require("path")

//Set multer storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/uploads"),
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
      }
})

module.exports = multer({storage: storage}).single("image")