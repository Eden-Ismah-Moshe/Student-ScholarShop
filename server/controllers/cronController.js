const Product = require("../models/Product");
const { scrapeAndSaveProduct } = require("../services/scrapeAndSaveProduct");
const {
  generateEmailBody,
  sendEmail,
} = require("../nodemailer/generateEmailBody");

const maxDuration = 300; // This function can run for a maximum of 300 seconds
const dynamic = "force-dynamic";
const revalidate = 0;

exports.cronJob = async () => {
  try {
    const products = await Product.find({});
    if (!products)
      throw new Error(`Error No Products found in Cron get: ${error}`);

    // Scrape latest products deatile & update database
    const updatedProducts = await Promise.all(
      products.map(async (currProduct) => {
        const scrapedProduct = await scrapeAndSaveProduct(
          currProduct.productUrl
        );
        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        // Update Products in DB
        const updatedProduct = await Product.findOneAndUpdate(
          { productUrl: product.productUrl },
          product
        );

        // Check each product is status & send email accordingly
        const emailNotifType = getEmailNotifType(scrapedProduct, currProduct);

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            productUrl: updatedProduct.productUrl,
          };
          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );
          const userEmails = updatedProduct.users.map((user) => user.email);
          await sendEmail(emailContent, userEmails);
        }
        return updatedProduct;
      })
    );
    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error(`Error in Cron get: ${error}`);
  }
};

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

const THRESHOLD_PERCENTAGE = 40;

const getLowestPrice = (priceList) => {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
};

const getEmailNotifType = (scrapedProduct, currentProduct) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET;
  }

  return null;
};
