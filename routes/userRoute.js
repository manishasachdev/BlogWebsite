const express = require("express");
const router = express.Router();
const userController= require("../controllers/userController")
const authGuard=require("../middlewares/authMiddleware")


router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/profile", authGuard, userController.userProfile)
router.put("/updateProfile", authGuard, userController.updateProfile)
router.put("/updateProfilePicture",authGuard, userController.updateProfilePicture )


module.exports = router;