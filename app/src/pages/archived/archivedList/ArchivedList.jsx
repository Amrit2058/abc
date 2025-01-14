import React from "react";

const ArchivedIssues = ({ archivedIssues, deleteFromArchive, goToArchivedList }) => {  // Make sure goToArchivedList is passed as a prop
  return (
    <>
      <div className="big-div">
        {/* Button to Navigate to Archived List */}
        <div className="archived-list-button">
          <button onClick={goToArchivedList} className="go-to-archived-button">
            View Archived Issues
          </button>
        </div>
      </div>
      <div>
        <h3>Archived Issues</h3>
        {archivedIssues.length === 0 ? (
          <p>No archived issues.</p>
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
                          deleteFromArchive(issue._id);
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

export default ArchivedIssues;
