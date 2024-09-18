import React from "react";
import "../styles/Header.css";
import { FaGraduationCap } from "react-icons/fa6";

const Header = () => {
  return (
    <div>
      {" "}
      <header className="header">
        <FaGraduationCap size={50} />
        <h2>Student ScholarShop</h2>
        <nav className="navbar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

/*
 <li>
              <a href="/about">About Us</a>
            </li>
*/

export default Header;
