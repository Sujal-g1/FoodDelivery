
const express = require('express')
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();
const multer = require('multer') // now express can read files coming from the frontend like video urls etc

const upload = multer({
    storage: multer.memoryStorage()
})

// POST request -> /api/food/
// protected - only food partner can list the food
// middleware created to protect 
router.post('/',
    authMiddleware.authFoodPartnerMiddelware , 
    upload.single("video") ,
    foodController.createFood
)


// GET /api/food/  , protected
// this is for users
router.get('/' , 
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems 
 )


module.exports = router; 