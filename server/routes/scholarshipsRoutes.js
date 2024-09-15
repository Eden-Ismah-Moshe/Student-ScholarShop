const express = require("express");
const router = express.Router();
const scholarshipController = require("../controllers/scholarshipController");

router.get("/getAllScholarships", scholarshipController.getAllScholarships);
router.post("/scrapeScholarships", scholarshipController.scrapeScholarships);

module.exports = router;
