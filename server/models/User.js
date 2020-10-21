//Imports
const {Schema, model} = require("mongoose")

//Set Schema
const userSchema =  new Schema({
    username: {type: String , unique: true, required: true },
    email: {type: String , unique: true, required: true },
    password: {type: String, required: true},
    register_date: {type: Date, default: Date.now},
})

//Export Model
module.exports = model("User", userSchema)