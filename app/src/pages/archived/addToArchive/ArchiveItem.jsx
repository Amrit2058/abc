import React from "react";
import './IssueItem.css';

const ArchiveItem = ({ archivedIssue, restoreIssue, permanentlyDeleteIssue }) => {

  const handleRestore = () => {
    if (window.confirm("Are you sure you want to restore this issue?")) {
      restoreIssue(archivedIssue._id);
    }
  };

  const handlePermanentDelete = () => {
    if (window.confirm("Are you sure you want to permanently delete this archived issue? This action cannot be undone.")) {
      permanentlyDeleteIssue(archivedIssue._id);
    }
  };

  return (
    <div className="issue-item">
      <h3>{archivedIssue.ticketId}</h3>
      <p>{archivedIssue.date}</p>
      <p>{archivedIssue.site}</p>
      <p>{archivedIssue.topic}</p>
      <p>{archivedIssue.summary}</p>
      <p>Status: {archivedIssue.status}</p>

      <button onClick={handleRestore} className="restore-button">
        Restore
      </button>

      <button onClick={handlePermanentDelete} className="delete-button">
        Permanently Delete
      </button>
    </div>
  );
};

export default ArchiveItem;
