const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require("../middlewares/auth")
const {jobDetail, createJob, singleJob, updateJob, allJobs} = require("../controllers/jobController");


//create job
// /api/job/create
router.post("/job/create", isAuthenticated, isAdmin, createJob)

//job detail
// /api/job/id
router.get("/job/:id", singleJob)

//update jobs 
// /api/job/update/job_id
router.put("/job/update/:job_id", isAuthenticated, isAdmin, updateJob)

//show all jobs 
// /api/jobs/show
router.get("/jobs/alljobs", allJobs)


module.exports = router
 