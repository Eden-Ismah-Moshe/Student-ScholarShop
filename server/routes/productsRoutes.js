const express = require("express");
const productController = require("../controllers/productsController");

const router = express.Router();

router.post("/scrape-product", productController.scrapProduct);
router.get("/getProductById", productController.getProductById);
router.get("/getAllProducts", productController.getAllProducts);

module.exports = router;
