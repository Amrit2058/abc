import React, {  useEffect, useContext } from "react";
import IssueList from "../../components/IssueList/IssueList";
import { axiosClient } from "../../lib/axios";
import { Link } from "react-router";
import ArchivedList from "../../components/archivedList";
import { issueContext } from "../../context/issue";


export default function HomePage() {

  const {issues, setIssues} = useContext(issueContext);


  useEffect(() => {
    axiosClient.get("/issues").then((response) => {
        setIssues(response.data);
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);
  
  // Count the issues based on their status
  const getStatusCounts = () => {
    const counts = { Pending: 0, "In Progress": 0, Completed: 0 };
    issues.forEach((issue) => {
      if (issue.status === "Pending") counts.Pending += 1;
      if (issue.status === "In Progress") counts["In Progress"] += 1;
      if (issue.status === "Completed") counts.Completed += 1;
    });
    return counts;
  };

  // Pie chart data
  const statusCounts = getStatusCounts();

  return (
    <>
      <div className="app-container">
        <h1>Nepal Telecom Activity Plan</h1>

        {/* Conditionally render the status div */}
     
          <div className="status">
            <div className="status-count-container">
              <span>Pending: {statusCounts.Pending}</span>
              <span>In Progress: {statusCounts["In Progress"]}</span>
              <span>Completed: {statusCounts.Completed}</span>
            </div>
          </div>
        

        <div id="button">
          <Link to="/issues/add" className="add-button" id="changing-button">
            Add Issues
          </Link>
        </div>

        <IssueList issues={issues.filter(issue => issue.archivedAt === null)} />
        <ArchivedList archivedIssues={issues.filter(issue => issue.archivedAt !== null)} /> 
      </div>
    </>
  );
}
