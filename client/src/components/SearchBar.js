import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";
import { scrapeAmazonProduct } from "../services/ProductsAPI";

const isValidAmazonProductURL = (url) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    return hostname.includes("amazon.com") || hostname.includes("amazon.");
  } catch (error) {
    return false;
  }
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchLink, setSearchLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchLink);
    if (!isValidLink) {
      return alert("Please provide a valid Amazon link");
    }

    try {
      setIsLoading(true);
      const productData = await scrapeAmazonProduct(searchLink);
      if (!productData) {
        throw new Error("No product data found");
      }
      setProductDetails(productData);
      navigate(`/products/${productData._id}`, {
        state: { id: productData._id },
      });
    } catch (error) {
      console.error("Error fetching product data on frontend:", error);
      alert(`Failed to fetch product details: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={searchLink === ""}>
          {" "}
          {isLoading ? "...מחפש" : "חיפוש"}
        </button>
        <input
          type="text"
          value={searchLink}
          onChange={(e) => setSearchLink(e.target.value)}
          placeholder="לינק למוצר Amazon הכנס"
        />
      </form>

      {productDetails && (
        <div>
          <h2>Product Details:</h2>
          <p>Title: {productDetails.title}</p>
          <p>Price: {productDetails.price}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
