

const express = require('express');


const router = express.Router();
const userController=require("../controllers/recipe")
const userauthenticate=require("../middleware/auth")
const multer = require('multer');

const upload = multer()



router.post("/addRecipe",userauthenticate.authenticate,upload.single("file"),userController.addRecipe);
router.post("/addRecipe/:id",userauthenticate.authenticate,upload.single("file"),userController.editRecipe);
router.get("/getRecipes/:id",userauthenticate.authenticate,userController.getRecipe);
router.delete("/deleteRecipe/:id",userauthenticate.authenticate,userController.deleteRecipe);
router.delete("/recipes/pic/:id",userController.deletePic);
router.post("/searchRecipes",userauthenticate.authenticate,userController.searchRecipe);
router.get("/getRecipes",userauthenticate.authenticate,userController.getRecipeAll);
router.get("/getRecipes/follow/:id",userauthenticate.authenticate,userController.getfollowRecipeAll);


module.exports = router;