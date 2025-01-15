import React, { useState, useEffect, useContext } from "react";
import IssueList from "../../components/IssueList/IssueList";
import { axiosClient } from "../../lib/axios";
import { Link } from "react-router";
import ArchivedList from "../../components/archivedList";
import { issueContext } from "../../context/issue";

export default function HomePage() {
  const { issues, setIssues } = useContext(issueContext);
  const [showArchived, setShowArchived] = useState(false); // State to toggle archived list

  useEffect(() => {
    axiosClient
      .get("/issues")
      .then((response) => {
        setIssues(response.data);
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, [setIssues]);

  const getStatusCounts = () => {
    const counts = { Pending: 0, "In Progress": 0, Completed: 0 };

    // Filter issues that are not archived and count their statuses
    issues
      .filter((issue) => issue.archivedAt === null)
      .forEach((issue) => {
        if (issue.status === "Pending") counts.Pending += 1;
        if (issue.status === "In Progress") counts["In Progress"] += 1;
        if (issue.status === "Completed") counts.Completed += 1;
      });

    return counts;
  };

  const statusCounts = getStatusCounts();

  const toggleArchivedList = () => {
    setShowArchived((prev) => !prev);
  };

  return (
    <>
      <div className="app-container">
        <h1>Nepal Telecom Activity Plan</h1>

        {/* Status Counts */}
        <div className="status">
          <div className="status-count-container">
            <span>Pending: {statusCounts.Pending}</span>
            <span>In Progress: {statusCounts["In Progress"]}</span>
            <span>Completed: {statusCounts.Completed}</span>
          </div>
        </div>

        {/* Add Activity Button */}
        <div id="button">
          <Link to="/issues/add" className="add-button" id="changing-button">
            Add Activity
          </Link>
        </div>

        {/* Active Issues List */}
        <IssueList issues={issues.filter((issue) => issue.archivedAt === null)} />

        {/* Toggle Archived Issues Button */}
        <div id="toggle-archived" style={{ marginTop: "20px" }}>
          <button onClick={toggleArchivedList}>
            {showArchived ? "Hide Archived Issues" : "Show Archived Issues"}
          </button>
        </div>

        {/* Archived Issues List (conditionally displayed) */}
        {showArchived && (
          <div style={{ marginTop: "20px" }}>
            <ArchivedList
              archivedIssues={issues.filter((issue) => issue.archivedAt !== null)}
            />
          </div>
        )}
      </div>
    </>
  );
}
