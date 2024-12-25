

const express = require('express');


const router = express.Router();
const userController=require("../controllers/favorite")
const userauthenticate=require("../middleware/auth")





router.get("/favorites/:recipeId",userauthenticate.authenticate,userController.addRecipe);
router.post("/collections",userauthenticate.authenticate,userController.addCollection);
router.get("/collections/:collectionId/:recipeId",userauthenticate.authenticate,userController.addRecipeCollection);
router.get("/favorites",userauthenticate.authenticate,userController.favorites);
router.get("/allfavorites",userauthenticate.authenticate,userController.allfavorites);
router.get("/allfavorites/follow/:id",userauthenticate.authenticate,userController.followfavorites);

module.exports = router;