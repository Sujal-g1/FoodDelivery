
const foodModel = require('../models/food.model');
const foodPartnerModel = require('../models/foodPartner.model');
const storageService = require("../services/storage.service")
const {v4:uuid} = require('uuid')

async function createFood(req , res){

    const fileUploadResult = await storageService.uploadFile(req.file.buffer , uuid())  

    console.log(fileUploadResult)

    const foodItem = await foodModel.create({
        name : req.body.name,
        description : req.body.description,
        video:fileUploadResult.url,
        foodPartner : req.foodPartner._id 
    })

    res.status(201).json({
        message:"Food created successfully",
        food: foodItem 
    })
}

async function getFoodItems(req , res){

 const foodItems = await foodModel.find({})
 res.status(200).json({
    message:"Food items fetched successfully",
    foodItems
 })
}

async function getFoodPartnerById(req, res) {
  try {
    const { id } = req.params;

    const foodPartner = await foodPartnerModel.findById(id).lean();

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    const foodItems = await foodModel.find({ foodPartner: id });

    foodPartner.foodItems = foodItems;

    res.status(200).json({
      foodPartner
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
    createFood,
    getFoodItems,
    getFoodPartnerById
}  