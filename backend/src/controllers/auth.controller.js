
const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodpartner.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





// the server created by express can't read request from body by default

async function registerUser(req, res){
    const { fullName , email , password } = req.body;
    console.log("Checking email:", email);


    if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }
  
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    console.log("Found user:", isUserAlreadyExists);

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists"
        })
    }

    const hashedPassword =  await bcrypt.hash(password , 10);

    const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })
 
    const token = jwt.sign({
         id:user._id,   
    } ,process.env.JWT_SECRET)
    res.cookie("token" , token )

    res.status(201).json({
        message:"user registered succesfully ",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}
 
async function loginUser(req, res){
    const {email , password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
       return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password );

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in succesfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }  
    })
}

async function logoutUser(req , res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out succesfully"
    });
}

async function registerFoodPartner(req , res){
 const { fullName , email , password , phone, address , contactName } = req.body;

     const isAccountAlreadtExists  = await foodPartnerModel.findOne({
         email
     })

     if(isAccountAlreadtExists){
        return res.status(400).json({
            message:"Food partner account already exists"
        })
     }

    const hashedPassword = await bcrypt.hash(password , 10); 

     const foodpartner = await foodPartnerModel.create({
        fullName , email , password:hashedPassword,
        phone, address , contactName  
     })

     const token = jwt.sign({
        id : foodpartner._id,
     }, process.env.JWT_SECRET) 

     res.cookie("token" , token)

     res.status(201).json({
        message:"Food partner registered succesfully",
        foodpartner:{
            _id : foodpartner._id,
            email:foodpartner.email,
            name:foodpartner.name
        }
     })
}

async function loginFoodPartner(req , res){ 
    const { name ,email , password} = req.body;

    const foodpartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodpartner){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodpartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id:foodpartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)


    res.status(200).json({
        message:"Food partner logged in successfully",
        foodpartner:{
            _id : foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email,
        }
    })
}

function logoutFoodPartner(req , res){
    res.clearCookie("token");
    res.status(200).json({
        message : "Food partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser  ,
    logoutUser,
    registerFoodPartner , 
    loginFoodPartner,
    logoutFoodPartner
}

// in an object we can export multiple user