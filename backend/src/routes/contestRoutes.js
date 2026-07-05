const express = require("express");
const { getContests } = require("../controllers/contestController");

const router = express.Router();

router.get("/", getContests);

module.exports = router;
