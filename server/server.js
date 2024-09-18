const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const scholarshipsRoutes = require("./routes/scholarshipsRoutes");
const productsRoutes = require("./routes/productsRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/scholarships", scholarshipsRoutes); // Prefix the routes with '/scholarships'
app.use("/products", productsRoutes); // Use product routes

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
