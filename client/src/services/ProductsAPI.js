import axios from "axios";
import { API_BASE_URL } from "../constants";

export const scrapeAmazonProduct = async (productUrl) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/products/scrape-product`,
      {
        productUrl,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await axios.get(`${API_BASE_URL}/products/getProductById`, {
      params: { productId },
    });
    return product;
  } catch (error) {
    console.error("Error getting the product data by id:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const products = await axios.get(`${API_BASE_URL}/products/getAllProducts`);
    return products;
  } catch (error) {
    console.error("Error getting all the products data:", error);
    throw error;
  }
};

export const addUserEmailToProduct = async (productId, userEmail) => {
  try {
    await axios.post(`${API_BASE_URL}/products/addUserEmailToProduct`, {
      productId,
      userEmail,
    });
  } catch (error) {
    console.error("Error add user email to product:", error);
    throw error;
  }
};
