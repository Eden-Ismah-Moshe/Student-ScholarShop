const Product = require("../models/Product");
const { scrapeAndSaveProduct } = require("../services/scrapeAndSaveProduct");

exports.scrapProduct = async (req, res) => {
  const { productUrl } = req.body;

  if (!productUrl) {
    return res.status(400).json({ error: "Product URL is required" });
  }

  try {
    const product = await scrapeAndSaveProduct(productUrl);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error in scrap Product Controller:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ error: "Product Id is required" });
  }

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) return null;

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in get Product Controller:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in get All Product Controller:", error);
    res.status(500).json({ error: error.message });
  }
};
