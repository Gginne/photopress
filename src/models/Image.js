//Imports
const {Schema, model} = require("mongoose")

//Set Schema
const imageSchema = new Schema({
    name: String,
    url: String,
})

module.exports = model("Image", imageSchema)