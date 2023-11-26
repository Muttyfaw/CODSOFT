const express = require('express');
const router = express.Router();
const {jobDetail, jobList} = require("../controllers/jobController");

//job detail
router.post("/jobdetails", jobDetail)
// //job detail
// router.post("/joblist", jobList)

module.exports = router
