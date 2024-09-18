const Product = require("../models/Product");
const { scrapeAndSaveProduct } = require("../services/scrapeAndSaveProduct");
const {
  generateEmailBody,
  sendEmail,
} = require("../nodemailer/generateEmailBody");

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
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ error: "Product Not Found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in get Product Controller:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({ error: "Product Not Found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in get All Product Controller:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addUserEmailToProduct = async (req, res) => {
  const { productId, userEmail } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ error: "Product Not Found" });
    }

    const userExists = product.users.some((user) => user.email === userEmail);
    if (!userExists) {
      product.users.push({ email: userEmail });
      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
    res
      .status(200)
      .json({ message: "User email added and notification sent." });
  } catch (error) {
    console.error("Error in add User Email To Product Controller:", error);
    res.status(500).json({ error: error.message });
  }
};
