import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";

const HomePage = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to the Nepal Telecom Activity Plans</h1>
      <div className="buttons">
        <Link to="/issuesList" className="button">
          Go to Plans 
        </Link>
        <Link to="/archivedList" className="button">
          Go to Archived Plans
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
