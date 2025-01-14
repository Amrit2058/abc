import { useState, useContext } from "react";
import { axiosClient } from "../../../lib/axios";
import { issueContext } from "../../../context/issue";

export default function SingleIssue({issue}) {

  const { setIssues } = useContext(issueContext);
  const [status, setStatus] = useState(issue.status);

  const updateStatus = async (newStatus) => {

    setStatus(newStatus);
    // Update the status on the server
    const response = await axiosClient.patch(`/issues/${issue._id}/status`, {
      status: newStatus,
    });

    setIssues(response.data);
  };


  const archiveIssue = async () => {
    const response = await axiosClient.patch(`/issues/${issue._id}/archive`);
    setIssues(response.data);
  }

  return (
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
                    value={status}
                    onChange={(e) => updateStatus(e.target.value)}
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
                        archiveIssue();
                      }
                    }}
                  >
                    Archive
                  </button>
                </td>
              </tr>
    )
}