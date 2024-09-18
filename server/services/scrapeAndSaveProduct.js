/*const puppeteer = require("puppeteer");
const Product = require("../models/Product");

const scrapeAndSaveProduct = async (productUrl) => {
  if (!productUrl) return;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(productUrl, { waitUntil: "domcontentloaded" });

    // Extract product details
    const productData = await page.evaluate((productUrl) => {
      // Helper function to clean up text
      const cleanText = (text) => text?.trim() || "";

      // Title
      const title = cleanText(
        document.querySelector("#productTitle")?.innerText
      );

      // Current price (based on multiple possible selectors)
      const currentPrice = cleanText(
        document.querySelector(".priceToPay span.a-price-whole")?.innerText ||
          document.querySelector(".a-size-base.a-color-price")?.innerText ||
          document.querySelector("#priceblock_dealprice")?.innerText
      );

      // Original price
      const originalPrice = cleanText(
        document.querySelector("#priceblock_ourprice")?.innerText ||
          document.querySelector(".a-price.a-text-price span.a-offscreen")
            ?.innerText ||
          document.querySelector("#listPrice")?.innerText
      );

      // Stock status
      const outOfStock =
        cleanText(
          document.querySelector("#availability span")?.innerText
        ).toLowerCase() === "currently unavailable";

      // Images (extract the first image from the dynamic image data)
      const images =
        document
          .querySelector("#imgBlkFront")
          ?.getAttribute("data-a-dynamic-image") ||
        document
          .querySelector("#landingImage")
          ?.getAttribute("data-a-dynamic-image") ||
        "{}";
      const imageUrls = Object.keys(JSON.parse(images));

      // Currency
      const currency =
        cleanText(document.querySelector(".a-price-symbol")?.innerText) || "$";

      // Description (if available in the "feature-bullets" or product description)
      const description =
        Array.from(document.querySelectorAll("#feature-bullets ul li span"))
          .map((el) => cleanText(el.innerText))
          .join(" ") ||
        cleanText(document.querySelector("#productDescription p")?.innerText);

      return {
        productUrl,
        currency: currency || "$",
        image: imageUrls[0] || null, // Get the first image URL if available
        title,
        currentPrice:
          currentPrice.replace(/[^\d.]/g, "") ||
          originalPrice.replace(/[^\d.]/g, ""), // Remove non-numeric characters
        originalPrice:
          originalPrice.replace(/[^\d.]/g, "") ||
          currentPrice.replace(/[^\d.]/g, ""), // Remove non-numeric characters
        priceHistory: [],
        isOutOfStock: outOfStock,
        description,
        lowestPrice:
          currentPrice.replace(/[^\d.]/g, "") ||
          originalPrice.replace(/[^\d.]/g, ""),
        highestPrice:
          originalPrice.replace(/[^\d.]/g, "") ||
          currentPrice.replace(/[^\d.]/g, ""),
        averagePrice:
          currentPrice.replace(/[^\d.]/g, "") ||
          originalPrice.replace(/[^\d.]/g, ""),
      };
    }, productUrl); // <-- Pass productUrl here

    await browser.close();

    let product = productData;

    // Save/Update the product data to MongoDB
    const existingProduct = await Product.findOne({
      productUrl: productData.productUrl,
    });

    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: productData.currentPrice },
      ];

      product = {
        ...productData,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { productUrl: productData.productUrl }, // Find by productUrl
      product, // New product data to update or insert
      { upsert: true, new: true } // upsert: true - create if not found; new: true - return the updated document
    );
    //await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error("Error scraping Amazon product:", error);
    throw new Error("Failed to scrape product");
  }
};*/

const chromium = require("chrome-aws-lambda");
const Product = require("../models/Product");

const scrapeAndSaveProduct = async (productUrl) => {
  if (!productUrl) return;

  let browser;

  try {
    // Use Chrome AWS Lambda executable
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(productUrl, { waitUntil: "domcontentloaded" });

    // Extract product details
    const productData = await page.evaluate((productUrl) => {
      const cleanText = (text) => text?.trim() || "";

      const title = cleanText(
        document.querySelector("#productTitle")?.innerText
      );
      const currentPrice = cleanText(
        document.querySelector(".priceToPay span.a-price-whole")?.innerText ||
          document.querySelector(".a-size-base.a-color-price")?.innerText ||
          document.querySelector("#priceblock_dealprice")?.innerText
      );
      const originalPrice = cleanText(
        document.querySelector("#priceblock_ourprice")?.innerText ||
          document.querySelector(".a-price.a-text-price span.a-offscreen")
            ?.innerText ||
          document.querySelector("#listPrice")?.innerText
      );
      const outOfStock =
        cleanText(
          document.querySelector("#availability span")?.innerText
        ).toLowerCase() === "currently unavailable";

      const images =
        document
          .querySelector("#imgBlkFront")
          ?.getAttribute("data-a-dynamic-image") ||
        document
          .querySelector("#landingImage")
          ?.getAttribute("data-a-dynamic-image") ||
        "{}";
      const imageUrls = Object.keys(JSON.parse(images));
      const currency =
        cleanText(document.querySelector(".a-price-symbol")?.innerText) || "$";
      const description =
        Array.from(document.querySelectorAll("#feature-bullets ul li span"))
          .map((el) => cleanText(el.innerText))
          .join(" ") ||
        cleanText(document.querySelector("#productDescription p")?.innerText);

      return {
        productUrl,
        currency,
        image: imageUrls[0] || null,
        title,
        currentPrice:
          currentPrice.replace(/[^\d.]/g, "") ||
          originalPrice.replace(/[^\d.]/g, ""),
        originalPrice:
          originalPrice.replace(/[^\d.]/g, "") ||
          currentPrice.replace(/[^\d.]/g, ""),
        priceHistory: [],
        isOutOfStock: outOfStock,
        description,
        lowestPrice:
          currentPrice.replace(/[^\d.]/g, "") ||
          originalPrice.replace(/[^\d.]/g, ""),
        highestPrice:
          originalPrice.replace(/[^\d.]/g, "") ||
          currentPrice.replace(/[^\d.]/g, ""),
        averagePrice:
          currentPrice.replace(/[^\d.]/g, "") ||
          originalPrice.replace(/[^\d.]/g, ""),
      };
    }, productUrl);

    await browser.close();

    let product = productData;

    // Save/Update the product data to MongoDB
    const existingProduct = await Product.findOne({
      productUrl: productData.productUrl,
    });

    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: productData.currentPrice },
      ];

      product = {
        ...productData,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { productUrl: productData.productUrl },
      product,
      { upsert: true, new: true }
    );

    return newProduct;
  } catch (error) {
    console.error("Error scraping Amazon product:", error);
    throw new Error("Failed to scrape product");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

function getLowestPrice(priceList) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

function getHighestPrice(priceList) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

function getAveragePrice(priceList) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

module.exports = { scrapeAndSaveProduct };
