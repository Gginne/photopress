//Imports
require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Controller Class
class UserController{
    async get(req, res){
        const foundUser = await User.findById(req.user.id).select("-password")
        res.json(foundUser)
    }

    async post(req, res){
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "Enter all fields"})
        } 

        let foundUser = await User.findOne({email: email})
        if(foundUser) return res.status(400).json({message: "User already exists"});
        let newUser = new User({username, email, password})

        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(newUser.password, salt)
              
        newUser.password = hash;
        const hUser = await newUser.save()
        const token = await jwt.sign({id: hUser.id}, process.env.JWTSECRET, {expiresIn: 3600})
        res.json({token, user: {id: hUser.id, username: hUser.username, email: hUser.email}})
         
    }
    async auth(req, res){
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Enter all fields"})
        } 

        let foundUser = await User.findOne({email: email})
        if(!foundUser) return res.status(400).json({message: "User does not exist exists"});
        
        //validate pass
        const isMatch = await bcrypt.compare(password, foundUser.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        } else {
            const token = await jwt.sign({id: foundUser.id}, process.env.JWTSECRET, {expiresIn: 3600})
            res.json({token, user: {id: foundUser.id, username: foundUser.username, email: foundUser.email}})
        }
    }
    
    async delete(req, res){
       
    }

    
}

module.exports = new UserController()