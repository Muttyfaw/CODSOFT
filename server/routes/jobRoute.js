const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require("../middlewares/auth")
const {jobDetail, jobList, createJob, singleJob, updateJob} = require("../controllers/jobController");


//create job
// /api/job/create
router.post("/job/create", isAuthenticated, isAdmin, createJob)

//job detail
// /api/job/id
router.get("/job/:id", singleJob)

//update jobs 
// /api/job/update/job_id
router.put("/job/update/:job_id", isAuthenticated, isAdmin, updateJob)


module.exports = router
 