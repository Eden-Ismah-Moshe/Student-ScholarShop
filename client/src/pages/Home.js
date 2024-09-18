import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();

  const goToScholarships = () => {
    navigate("/scholarships");
  };

  const goToEcommerce = () => {
    navigate("/ecommerce");
  };

  return (
    <div className="home-container">
      <Header />

      <main
        className="main-content"
        /*style={{ backgroundImage: `url(${backgroundImage})` }}*/
      >
        <section className="intro-section">
          <h2>Welcome to Student ScholarShop</h2>
          <p>
            {/*Connecting students with opportunities through scholarships and
            e-commerce product tracking.*/}
            חיבור סטודנטים להזדמנויות באמצעות מלגות ומעקב אחר מוצרי מסחר
            אלקטרוני
          </p>
          <div className="button-container">
            <button className="feature-button" onClick={goToScholarships}>
              {/*Student Scholarships*/}
              מלגות סטודנטים
            </button>
            <button className="feature-button" onClick={goToEcommerce}>
              {/* E-commerce Product Scraping*/}
              מוצרי מסחר אלקטרוני
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Eden Ismah-Moshe &copy; {new Date().getFullYear()}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
