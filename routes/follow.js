

const express = require('express');


const router = express.Router();
const userController=require("../controllers/follow")
const userauthenticate=require("../middleware/auth")





router.get("/follow/:userId",userauthenticate.authenticate,userController.follow);
router.get("/feed",userauthenticate.authenticate,userController.feed);


router.post("/activity",userauthenticate.authenticate,userController.activitys);

module.exports = router;