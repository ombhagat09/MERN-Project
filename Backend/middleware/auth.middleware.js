const jwt = require("jsonwebtoken")

const authmiddleware = (req,res,next)=>{

    console.log("Auth middleware start")

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            message:"token required"
        })
    }

    const token = authHeader.split(" ")[1]

    console.log("token",token)

    try{

        const data = jwt.verify(token,process.env.JWT_SECRET)

        req.user = data

        next()

    }
    catch(error){

        console.log("token verification failed")

        res.status(401).json({
            message:"invalid token"
        })

    }

}

module.exports = authmiddleware