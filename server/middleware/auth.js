require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("x-access-token")
    
    if(!token) return res.status(401).json({refresh: false, message: "No Access Token Provided"})

    try{
        
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
  
        req.user = decoded
        next()

    } catch(e){
        res.status(401).json({refresh: true, message: "Invalid Access Token"})
    }

    
}