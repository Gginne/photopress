//Imports
const {Schema, model} = require("mongoose")

//Set Schema
const imageSchema = new Schema({
    name: String,
    url: URL
})

const Image = model("image", imageSchema)