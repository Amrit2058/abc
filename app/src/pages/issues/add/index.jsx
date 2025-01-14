import React, { useContext, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router";
import { axiosClient } from "../../../lib/axios";
import { issueContext } from "../../../context/issue";

const AddIssuePage = () => {
  const [issue, setIssue] = useState({
    ticketId: "",
    site: "",
    topic: "",
    summary: "",
    status: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { setIssues } = useContext(issueContext);

  const navigate = useNavigate();
  const addIssue = async (newIssue) => {
    try {
      const response = await axiosClient.post("/issues", newIssue);
      setIssues(response.data);
      navigate("/");
    } catch(error) {
      alert(error.message);
      console.error(error);
    }
  };


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

  const handleAddIssue = async () => {
    if (
      issue.ticketId &&
      startDate &&
      endDate &&
      issue.site &&
      issue.topic &&
      issue.summary &&
      issue.status
    ) {
      await addIssue({...issue, dateRange: { startDate, endDate } });
    } else {
      alert("Please fill in all fields!");
    }
  };

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
            onClick={handleAddIssue}
            className="add-button"
            id="add-button"
          >
            Add Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIssuePage;
