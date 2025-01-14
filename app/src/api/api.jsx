import axios from "axios";

const API_URL = "http://localhost:5000/"; // Replace with your actual backend URL

// Get all issues
export const getAllIssues = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new issue
export const createIssue = async (issueData) => {
  const response = await axios.post(API_URL, issueData);
  return response.data;
};

// Update issue status
export const updateIssueStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/${id}/status`, { status });
  return response.data;
};

// Delete an issue
export const deleteIssue = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
