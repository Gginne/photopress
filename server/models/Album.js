//Imports
const {Schema, model} = require("mongoose")

//Set Schema
const albumSchema =  new Schema({
    name: {type: String , unique: true, required: true },
    photos: [{type: Schema.Types.ObjectId, ref: "Album"}],
    author: {type: Schema.Types.ObjectId, ref: "User"}
})

//Export Model
module.exports = model("Album", albumSchema)