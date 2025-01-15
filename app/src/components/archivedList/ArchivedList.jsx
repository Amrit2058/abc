import React, { useContext } from "react";
import { axiosClient } from "../../lib/axios";
import { issueContext } from "../../context/issue";

const ArchivedList = ({ archivedIssues }) => { 
  
  const { setIssues } = useContext(issueContext);

  async function deleteIssue(issue) {
   const response = await axiosClient.delete(`/issues/${issue._id}`);
   setIssues(response.data);
  }
  
  return (
    <>
      <div>
        <h3>Archived Activities</h3>
        {archivedIssues.length === 0 ? (
          <p>No archived activities</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Date</th>
                <th>Site</th>
                <th>Topic</th>
                <th>Summary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {archivedIssues.map((issue) => (
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
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this issue permanently?"
                          )
                        ) {
                          deleteIssue(issue);
                        }
                      }}
                    >
                      Delete Permanently
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ArchivedList;
