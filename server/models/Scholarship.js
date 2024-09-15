const mongoose = require("mongoose");

const scholarshipsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    require: true,
  },
  source: { type: String, required: true }, // "NUIS" or "Milgapo"
});

const Scholarships = mongoose.model("scholarships", scholarshipsSchema);
module.exports = Scholarships;
