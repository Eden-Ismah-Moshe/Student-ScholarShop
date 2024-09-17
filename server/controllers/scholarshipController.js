const Scholarships = require("../models/Scholarship");
const scrapeScholarshipsService = require("../services/scrapeScholarships");

// Scrape scholarships from the web and save to the database
exports.scrapeScholarships = async (req, res) => {
  try {
    const scholarships = await scrapeScholarshipsService.scrapeScholarships();

    const savedScholarships = await Scholarships.insertMany(scholarships);
    res.status(201).json({
      message: "Scholarships scraped and saved successfully",
      data: savedScholarships,
    });
  } catch (err) {
    res.status(500).json({ message: "Scraping Error" });
  }
};

// Get all the scholarships from the database
exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarships.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
