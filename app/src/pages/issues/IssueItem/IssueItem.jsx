import React, { useState } from "react";
import './IssueItem.css';

const IssueItem = ({ issue, updateStatus, deleteIssue }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(issue.status);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    updateStatus(issue._id, newStatus);
    setDropdownVisible(false); // Hide dropdown after status update
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      deleteIssue(issue._id);
    }
  };

  return (
    <div className="issue-item">
      <h3>{issue.ticketId}</h3>
      <p>{issue.date}</p>
      <p>{issue.site}</p>
      <p>{issue.topic}</p>
      <p>{issue.summary}</p>
      
      {/* Update Status Button */}
      <button onClick={() => setDropdownVisible(!isDropdownVisible)} className="update-status-button">
        Update Status
      </button>

      {/* Dropdown for selecting status */}
      {isDropdownVisible && (
        <div className="status-dropdown">
          <select value={newStatus} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdateStatus} className="confirm-status-button">
            Confirm
          </button>
        </div>
      )}

      {/* Delete Button */}
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default IssueItem;
