const Scholarships = require("../models/Scholarship");
const scrapeService = require("../services/scraperService");

// Scrape scholarships from the web and save to the database
exports.scrapeScholarships = async (req, res) => {
  try {
    const scholarships = await scrapeService.scrapeScholarships();

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
