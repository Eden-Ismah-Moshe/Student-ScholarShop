const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const scholarshipsRoutes = require("./routes/scholarshipsRoutes");
const productsRoutes = require("./routes/productsRoutes");
const cronRoutes = require("./routes/cronRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
// Allow specific origin(s)
app.use(
  cors({
    origin: "https://student-scholar-shop.vercel.app",
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/scholarships", scholarshipsRoutes);
app.use("/products", productsRoutes);
app.use("/cron", cronRoutes);

// Export the Express app as a serverless function
/*
module.exports = (req, res) => {
  app(req, res);
};
*/

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
