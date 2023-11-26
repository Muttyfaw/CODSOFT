const express = require("express");
const { employerSignin, employerProfile, employerSignup } = require("../controllers/employerController");
const router = express.Router();


router.post("/employer/signin", employerSignin);

router.post("/employer/signup", employerSignup);

router.post("/employer/signin", employerProfile);

module.exports = router