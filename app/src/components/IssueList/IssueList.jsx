import React, { useState } from "react";
import "./IssueList.scss";
import SingleIssue from "./SingleIssue";

const IssueList = ({ issues }) => {
  const [filter, setFilter] = useState("All");

  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter((issue) => issue.status === filter);

  if(issues.length === 0) {
    return <p>No issues found.</p>;
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
