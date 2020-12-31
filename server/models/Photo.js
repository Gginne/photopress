//Imports
const {Schema, model} = require("mongoose")

//Set Schema
const photoSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    notes: {type: String, required: false},
    geolocation: {type: [Number], required: false},
    created_at: {type: Date, default: Date.now},
    author: {type: Schema.Types.ObjectId, ref: "User"},
    tags: {type: [String], required: false}
})

//Export Model
module.exports = model("Photo", photoSchema)