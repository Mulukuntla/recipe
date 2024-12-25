

const express = require('express');


const router = express.Router();
const userController=require("../controllers/admin")
const userauthenticate=require("../middleware/auth")







router.get("/users",userauthenticate.authenticate,userController.users);
router.get("/recipes",userauthenticate.authenticate,userController.recipes);


router.get("/users/approve/:userId",userauthenticate.authenticate,userController.approve);
router.get("/users/notApprove/:userId",userauthenticate.authenticate,userController.notApprove);
router.delete("/recipes/:recipeId",userauthenticate.authenticate,userController.notApproveRecipe);
router.delete("/recipes/pic/:id",userauthenticate.authenticate,userController.deletePic);


module.exports = router;