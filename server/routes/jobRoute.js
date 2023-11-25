const express = require('express');
const router = express.Router();
const {jobDetail} = require("../controllers/jobController");

//job detail
router.post("/jobdetails", jobDetail)

module.exports = router
