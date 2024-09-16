import React, { useState } from "react";
import "../styles/SearchBar.css";

const isValidAmazonProductURL = (url) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const SearchBar = () => {
  const [searchLink, setSearchLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const isValidLink = isValidAmazonProductURL(searchLink);
    if (!isValidLink) {
      return alert("Please provide a valid Amazon link");
    }

    try {
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default SearchBar;
