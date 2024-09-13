import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";
import "../styles/Home.css";

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
      <header className="header">
        <FaGraduationCap size={50} />
        <h2>Student ScholarShop</h2>
        <nav className="navbar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </nav>
      </header>

      <main
        className="main-content"
        /*style={{ backgroundImage: `url(${backgroundImage})` }}*/
      >
        <section className="intro-section">
          <h2>Welcome to Student ScholarShop</h2>
          <p>
            Connecting students with opportunities through scholarships and
            e-commerce product tracking.
          </p>
          <div className="button-container">
            <button className="feature-button" onClick={goToScholarships}>
              Student Scholarships
            </button>
            <button className="feature-button" onClick={goToEcommerce}>
              E-commerce Product Scraping
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Eden Ismah-Moshe &copy; {new Date().getFullYear()} Our Platform. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
