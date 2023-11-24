const express = require("express")
const router = express.Router()
const {allUsers} = require("../controllers/userController")
const { isAuthenticated, isAdmin } = require("../middlewares/auth")

//userProfile
router.get("/users", isAuthenticated, isAdmin , allUsers);

module.exports = router;