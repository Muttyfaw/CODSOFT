const express = require("express");
const { signup, signin, logout, userProfile } = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//auth routes
//signup
router.post("/signup", signup);
//signin
router.post("/signin", signin);
//userProfile
router.get("/myprofile", isAuthenticated , userProfile);
//logout
router.get("/logout", logout);


module.exports = router;