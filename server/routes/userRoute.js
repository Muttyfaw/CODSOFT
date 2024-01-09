const express = require("express")
const router = express.Router()
const {allUsers, singleUser, editUser, createJobHistory} = require("../controllers/userController")
const { isAuthenticated, isAdmin } = require("../middlewares/auth")

//all users
router.get("/users", isAuthenticated, isAdmin , allUsers);

//single user
router.get("/user/:id", isAuthenticated, singleUser);

//edit user
//api/user/
router.put("/user/edit/:id", isAuthenticated, editUser);

//job History
//api/user/jobhistory
router.put("/user/jobshistory", isAuthenticated, isAdmin, createJobHistory);

module.exports = router;