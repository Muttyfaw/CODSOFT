const express = require("express");
const { signup, signin, logout } = require("../controllers/authController");
const router = express.Router();

//auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);

module.exports = router;