import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { createIssue, fetchIssues, updateIssueStatus, deleteIssue } from "../../../api/api";
import "./IssuesList.css";
import ListIssues from "./ListIssues";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues()
      .then((data) => setIssues(data))
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const addIssue = (newIssue) => {
    createIssue(newIssue)
      .then((createdIssue) => setIssues([...issues, createdIssue]))
      .catch((error) => console.error("Error adding issue:", error));
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const updatedIssue = await updateIssueStatus(id, newStatus);
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === id ? { ...issue, status: updatedIssue.status } : issue
        )
      );
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  };

  const removeIssue = (id) => {
    deleteIssue(id)
      .then(() => setIssues(issues.filter((issue) => issue._id !== id)))
      .catch((error) => console.error("Error deleting issue:", error));
  };

  const getStatusCounts = () =>
    issues.reduce(
      (counts, { status }) => {
        counts[status] = (counts[status] || 0) + 1;
        return counts;
      },
      { Pending: 0, "In Progress": 0, Completed: 0 }
    );

  const statusCounts = getStatusCounts();

  return (
    <div className="app-container">
      <h1>Plans List</h1>
      <div className="status">
        <div className="status-count-container">
          <span>Pending: {statusCounts.Pending}</span>
          <span>In Progress: {statusCounts["In Progress"]}</span>
          <span>Completed: {statusCounts.Completed}</span>
        </div>
      </div>
      <ListIssues addIssue={addIssue} />
    </div>
  );
}
