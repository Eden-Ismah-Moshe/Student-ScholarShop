const express = require("express");
const router = express.Router();
const scholarshipController = require("../controllers/scholarshipController");

router.post("/scrapeScholarships", scholarshipController.scrapeScholarships);
router.get("/getAllScholarships", scholarshipController.getAllScholarships);

module.exports = router;
