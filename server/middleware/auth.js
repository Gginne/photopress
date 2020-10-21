require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    
    if(!token) return res.status(401).json({message: "Authorization denied"})

    try{
        
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        
        req.user = decoded
        next()

    } catch(e){
        res.status(400).json({message: "Invalid Token"})
    }

    
}