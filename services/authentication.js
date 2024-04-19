const JWT = require("jsonwebtoken") ; 
// const secret = process.env.JWT_SECRET ; 
 function createTokenForUser(user){
    const payload={
        _id : user._id ,
        email:user.email ,
        profileImageURL:user.profileImageURL ,
        role:user.role 
    }
    const token = JWT.sign(payload, process.env.JWT_SECRET); 
    return token ; 
}

function validateToken(token){
    const payload = JWT.verify(token, process.env.JWT_SECRET); ; 
    return payload ; 
}

module.exports ={
    createTokenForUser ,
    validateToken,
}