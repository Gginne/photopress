//Imports
const {Schema, model} = require("mongoose")

//Set Schema
const photoSchema = new Schema({
    title: {type: String, required: true},
    img: {
        buffer: Buffer,
        path: String,
        filename: String,
        mimetype: String
    },
    notes: {type: String, required: false},
    geolocation: {type: [Number], required: false},
    created_at: {type: Date, default: Date.now},
    albums: [{type: Schema.Types.ObjectId, ref: "Album"}],
    tags: {type: [String], required: false}
})

//Export Model
module.exports = model("Photo", photoSchema)