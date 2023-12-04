const express = require('express');
const router = express.Router();
const {isAuthenticated} = require("../middlewares/auth")
const {jobDetail, jobList, createJob} = require("../controllers/jobController");


//create job
router.post("/createjob", isAuthenticated , createJob)
// //job detail
// router.post("/jobdetails", jobDetail)


module.exports = router
