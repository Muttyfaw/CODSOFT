const express = require("express");
const router = express.Router();

router.get("/", authCon);

module.exports = router;