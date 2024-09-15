import React, { useEffect, useState } from "react";
import { getAllScholarships } from "../services/ScholarshipsAPI";
import Header from "../components/Header";
import ScholarshipCard from "../components/ScholarshipCard";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await getAllScholarships();
        setScholarships(data);
      } catch (err) {
        setError("Failed to fetch scholarships");
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div>
      <Header />
      <h2 style={{ textAlign: "center" }}>מלגות פתוחות</h2>
      {error && <p>{error}</p>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {scholarships.map((scholarship) => (
          <ScholarshipCard
            title={scholarship.title}
            description={scholarship.description}
            link={scholarship.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
