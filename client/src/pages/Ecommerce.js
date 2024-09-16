import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import HeroCarousel from "../components/HeroCarousel";
import "../styles/Ecommerce.css";

const Ecommerce = () => {
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
        <div className="section2-continer"> </div>
      </section>
    </div>
  );
};

export default Ecommerce;
