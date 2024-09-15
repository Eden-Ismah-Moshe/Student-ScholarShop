import React from "react";
import "../styles/ScholarshipCard.css";

const ScholarshipCard = ({ title, description, link }) => {
  return (
    <div className="card-container">
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
      <div className="link-container">
        {/*target="_blank": This opens the link in a new window or tab.*/}
        {/*rel="noopener noreferrer": This improves security by preventing the new page from gaining access to the window.opener object, which can protect against certain types of security vulnerabilities.*/}
        <a
          href={link}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          פרטים נוספים
        </a>
      </div>
    </div>
  );
};

export default ScholarshipCard;
