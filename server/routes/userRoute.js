const express = require("express")
const router = express.Router()
const {allUsers, singleUser, editUser} = require("../controllers/userController")
const { isAuthenticated, isAdmin } = require("../middlewares/auth")

//all users
router.get("/users", isAuthenticated, isAdmin , allUsers);

//single user
router.get("/user/:id", isAuthenticated, singleUser);

//edit user
router.put("/user/edit/:id", isAuthenticated, editUser);

module.exports = router;