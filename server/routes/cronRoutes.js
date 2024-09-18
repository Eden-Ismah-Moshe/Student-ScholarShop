const express = require("express");
const cronController = require("../controllers/cronController");

const router = express.Router();

router.get("", cronController.cronJob);

module.exports = router;
