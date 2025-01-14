import React, { useState } from "react";
// import "./IssueList.css";

const ListIssues = ({ issues, updateStatus, deleteIssue, archiveIssue }) => {
  const [filter, setFilter] = useState("All");

  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter((issue) => issue.status === filter);

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
      {filteredIssues.length === 0 ? (
        <p>No issues found for the selected filter.</p>
      ) : (
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
              <tr key={issue._id}>
                <td>{issue.ticketId}</td>
                <td>
                  {issue.dateRange
                    ? `${new Date(
                        issue.dateRange.startDate
                      ).toLocaleDateString()} to ${new Date(
                        issue.dateRange.endDate
                      ).toLocaleDateString()}`
                    : "N/A"}
                </td>
                <td>{issue.site}</td>
                <td>{issue.topic}</td>
                <td>{issue.summary}</td>
                <td>{issue.status}</td>
                <td>{new Date(issue.createdAt).toLocaleString()}</td>
                <td>{new Date(issue.updatedAt).toLocaleString()}</td>
                <td>
                  <select
                    value={issue.status}
                    onChange={(e) => updateStatus(issue._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    className="archive-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to archive this issue?"
                        )
                      ) {
                        archiveIssue(issue._id);
                      }
                    }}
                  >
                    Archive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListIssues;
