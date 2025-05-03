const jwt = require("jsonwebtoken");

const authenticationToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];  
    if(!token){
        return res.status(401).json({
            message : "No token provided",
            success : false
        })
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({
                message : "Invalid token",
                success : false
            });
        }
        req.id = user.id;
        console.log("Decoded JWT:", user); 
        next();
    });
};

module.exports = authenticationToken;