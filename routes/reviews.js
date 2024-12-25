

const express = require('express');


const router = express.Router();
const userController=require("../controllers/reviews")
const userauthenticate=require("../middleware/auth")







router.post("/addReview/:recipeId",userauthenticate.authenticate,userController.addReview);
router.get("/allReviews/:recipeId",userauthenticate.authenticate,userController.getReviews);

module.exports = router;