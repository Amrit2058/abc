import React, { useState, useEffect } from "react";
import "./IssueList.scss";
import SingleIssue from "./SingleIssue";

const IssueList = ({ issues }) => {
  const [filter, setFilter] = useState("All");
  const [updatedIssues, setUpdatedIssues] = useState(issues);

  // Function to check and update the issue statuses
  const updateStatuses = () => {
    const now = new Date();
    const newIssues = issues.map((issue) => {
      const startDate = new Date(issue.startDate);
      const endDate = new Date(issue.endDate);

      if (now >= startDate && now < endDate && issue.status !== "In Progress") {
        return { ...issue, status: "In Progress", updatedAt: now.toISOString() };
      }
      if (now >= endDate && issue.status !== "Completed") {
        return { ...issue, status: "Completed", updatedAt: now.toISOString() };
      }
      return issue;
    });

    setUpdatedIssues(newIssues);
  };

  useEffect(() => {
    updateStatuses();
    const interval = setInterval(updateStatuses, 600000); 
    return () => clearInterval(interval); 
  }, [issues]);

  const filteredIssues =
    filter === "All"
      ? updatedIssues
      : updatedIssues.filter((issue) => issue.status === filter);

  if (issues.length === 0) {
    return <p>No activities found.</p>;
  }

  return (
    <div className="big-div">
      {/* Filter Section */}
      <div className="filter">
        <label htmlFor="filter">Filter by Status:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Main Issues Table */}
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Date</th>
            <th>Site</th>
            <th>Topic</th>
            <th>Summary</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue) => (
            <SingleIssue issue={issue} key={issue._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueList;
