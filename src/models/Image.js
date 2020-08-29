//Imports
const {Schema, model} = require("mongoose")

//Set Schema
const imageSchema = new Schema({
    title: {type: String, required: true},
    image_path: {type: String, required: true},
    notes: {type: String, required: false},
    created_at: {type: Date, default: Date.now}
})

module.exports = model("Image", imageSchema)