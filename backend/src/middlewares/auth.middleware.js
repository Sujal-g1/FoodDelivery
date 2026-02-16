
const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

//all middlewares have 3 parameters -> req , res and next
 
// this middleware is for food partners
async function authFoodPartnerMiddelware(req , res , next){

const token = req.cookies.token;

if(!token){
   return res.status(401).json({
        message:"Unauthorized Access"
    })
}

try{
  const decoded = jwt.verify(token , process.env.JWT_SECRET)

  const foodPartner = await foodPartnerModel.findById(decoded.id);

  req.foodPartner = foodPartner

  next()
}
catch(err){
     return res.status(401).json({
        message : "Invalid token"
     })
}

}

// this is for users
async function authUserMiddleware(req , res , next){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }

    try{
     const decoded = jwt.verify(token , process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id);
    req.user = user;
    next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddelware,  
    authUserMiddleware
}

// jwt.verify to verify the tokens , have 2 parameters
// 1 is token and other is secret key 

/*
we have stored the token in the object format.
we have stored the id in the token
so when jwt.verify compare 
if true then it will send token in object form so it will be saved in the decoded
but if it is false then we will handle in catch 

*/