import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import HeroCarousel from "../components/HeroCarousel";
import TrendingProductCard from "../components/TrendingProductCard";
import "../styles/Ecommerce.css";
import { getAllProducts } from "../services/ProductsAPI";

const Ecommerce = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log("dataaaa: ", data.data);
        setTrendingProducts(data.data);
      } catch (err) {
        setError("Failed to fetch Products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {" "}
      <Header />
      <section>
        <div className="section1-continer">
          <div className="search-continer">
            <h2 className="title">:קנייה חכמה מתחילה כאן</h2>
            <p>
              עקוב אחר מחירי המוצרים וקבל התראה על ירידת מחירים או שינויים במלאי{" "}
            </p>
            <SearchBar />
          </div>
          {/*<HeroCarousel /> */}
        </div>
      </section>
      <section>
        <div className="section2-continer">
          {trendingProducts?.map((product) => (
            <TrendingProductCard
              key={product._id}
              id={product._id}
              image={product.image}
              title={product.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Ecommerce;
