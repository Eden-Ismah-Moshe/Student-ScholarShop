import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import "../styles/ProductDetails.css";
import { getProductById } from "../services/ProductsAPI";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { state } = useLocation(); // Access the passed state
  const { id } = state || {}; // Destructure the product from state

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.data);
      } catch (err) {
        setError(error.message);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product details not available.</p>;

  return (
    <div>
      <Header />
      <div className="product-container1">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="price-section">
            <span className="current-price">${product.currentPrice}</span>
            <div className="price-details">
              <p>
                <span className="price-label">Current Price: </span>$
                {product.currentPrice}
              </p>
              <p>
                <span className="price-label">Average Price: </span>$
                {product.averagePrice}
              </p>
              <p>
                <span className="price-label">Highest Price: </span>$
                {product.highestPrice}
              </p>
              <p>
                <span className="price-label">Lowest Price: </span>$
                {product.lowestPrice}
              </p>
            </div>
            <button className="track-button">Track</button>
          </div>
        </div>
      </div>{" "}
      <div className="product-container2">
        <h3>Product Description</h3>
        <p className="product-description">{product.description}</p>
        <a
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="buy-now-button"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ProductDetails;
