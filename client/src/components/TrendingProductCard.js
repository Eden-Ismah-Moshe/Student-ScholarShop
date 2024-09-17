import React from "react";
import { Link } from "react-router-dom";
import "../styles/TrendingProductCard.css";

const TrendingProductCard = ({ id, image, title }) => {
  return (
    <Link
      to={`/products/${id}`}
      state={{ id }} // Pass product data via state
      className="trending-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div>
        <img src={image} alt={title} />
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default TrendingProductCard;
