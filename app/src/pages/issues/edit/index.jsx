import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../../lib/axios";
import { issueContext } from "../../../context/issue";
import "./style.scss";

const EditIssuePage = () => {
  const { id } = useParams(); // Fetch issue ID from URL
  const navigate = useNavigate();
  const { issues, setIssues } = useContext(issueContext);

  const [issue, setIssue] = useState({
    ticketId: "",
    site: "",
    topic: "",
    summary: "",
    status: "",
    createdAt: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the issue data by ID from the context
    const fetchedIssue = issues.find((issue) => issue._id === id);
    if (fetchedIssue) {
      setIssue(fetchedIssue);
      setStartDate(fetchedIssue.dateRange.startDate);
      setEndDate(fetchedIssue.dateRange.endDate);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, issues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleUpdateIssue = async () => {
    if (
      issue.ticketId &&
      startDate &&
      endDate &&
      issue.site &&
      issue.topic &&
      issue.summary &&
      issue.status
    ) {
      try {
        // Send updated issue data to the server
        const updatedIssue = { ...issue, dateRange: { startDate, endDate } };
        await axiosClient.put(`/issues/${id}`, updatedIssue);

        // Update the context with the new data
        setIssues(issues.map((item) => (item._id === id ? updatedIssue : item)));

        navigate("/");
      } catch (error) {
        alert("Error updating issue!");
        console.error(error);
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form">
      <div className="issue-input-container">
        <input
          type="text"
          name="ticketId"
          placeholder="Ticket Id"
          value={issue.ticketId}
          onChange={handleChange}
          className="input-field"
        />
        <div className="input-wrapper">
          <div className="dates-container">
            <div className="dates">
              <label htmlFor="start-date" className="label">
                Start Date:
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                className="date-selected"
              />
            </div>

            <div className="dates">
              <label htmlFor="end-date" className="label">
                End Date:
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                min={startDate}
                className="date-selected"
              />
            </div>

            <div>
              <p className="date-select">
                Selected range:{" "}
                {startDate && endDate
                  ? `${startDate} to ${endDate}`
                  : "Please select a date range."}
              </p>
            </div>
          </div>
        </div>
        <input
          type="text"
          name="site"
          placeholder="Issue Site"
          value={issue.site}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="topic"
          placeholder="Issue Topic"
          value={issue.topic}
          onChange={handleChange}
          className="input-field"
        />
        <textarea
          name="summary"
          placeholder="Issue Summary"
          value={issue.summary}
          onChange={handleChange}
          className="input-field"
          id="input-summary"
        />
        <select
          name="status"
          value={issue.status}
          onChange={handleChange}
          className="input-field"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="addd">
          <button
            onClick={handleUpdateIssue}
            className="add-button"
            id="add-button"
          >
            Update Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditIssuePage;
