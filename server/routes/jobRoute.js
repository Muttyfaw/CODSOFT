const express = require('express');
const router = express.Router();
const {jobDetail, jobList, createJob} = require("../controllers/jobController");


//create job
router.post("/createjob", createJob)
// //job detail
// router.post("/jobdetails", jobDetail)


module.exports = router
