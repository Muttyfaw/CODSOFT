const express = require("express");
const { signup } = require("../controllers/authController");
const router = express.Router();

//auth routes
router.post("/signup", signup);
// router.get("/signin", signin);
// router.get("/logout", logout);

module.exports = router;