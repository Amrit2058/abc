// import React, { useState, useEffect } from "react";
// import IssueInput from "../../components/IssueInput/IssueInput";
// import IssueList from "../../components/IssueList/IssueList";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { axiosClient } from "../../lib/axios";
// import { Link } from "react-router";

// // Register necessary Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function HomePage() {
//   const [issues, setIssues] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [isVisible, setIsVisible] = useState(true); // Controls visibility of the status div
//   console.log(isVisible);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   useEffect(() => {
//     axiosClient
//       .get("/issues")
//       .then((response) => {
//         console.log(response);
//         setIssues(response.data);
//       })
//       .catch((error) => console.error("Error fetching issues:", error));
//   }, []);

//   const addIssue = (newIssue) => {
//     axiosClient
//       .post("/issues", newIssue)
//       .then((response) => {
//         setIssues([...issues, response.data]);
//         setShowForm(false);
//         setIsVisible(true); // Revert to showing the status when issue is added
//       })
//       .catch((error) => console.error("Error adding issue:", error));
//   };

//   const updateStatus = async (id, newStatus) => {
//     // Find the issue that matches the given id
//     const updatedIssues = issues.map((issue) =>
//       issue._id === id ? { ...issue, status: newStatus } : issue
//     );

//     // Set the updated issues state
//     setIssues(updatedIssues);

//     // Update the status on the server
//     const response = await axiosClient.patch(`/issues/${_id}/status`, {
//       status: "Pending",
//     });

//     console.log({ response });
//   };

//   const deleteIssue = (id) => {
//     axios
//       .delete(`http://localhost:5001/issues/${_id}`)
//       .then(() => {
//         setIssues(issues.filter((issue) => issue._id !== id));
//       })
//       .catch((error) => console.error("Error deleting issue:", error));
//   };

//   // Count the issues based on their status
//   const getStatusCounts = () => {
//     const counts = { Pending: 0, "In Progress": 0, Completed: 0 };
//     issues.forEach((issue) => {
//       if (issue.status === "Pending") counts.Pending += 1;
//       if (issue.status === "In Progress") counts["In Progress"] += 1;
//       if (issue.status === "Completed") counts.Completed += 1;
//     });
//     return counts;
//   };

//   // Pie chart data
//   const statusCounts = getStatusCounts();

//   return (
//     <>
//       <div className="app-container">
//         <h1>Nepal Telecom Activity Plan</h1>

//         {/* Conditionally render the status div */}
//         {isVisible && (
//           <div className="status">
//             <div className="status-count-container">
//               <span>Pending: {statusCounts.Pending}</span>
//               <span>In Progress: {statusCounts["In Progress"]}</span>
//               <span>Completed: {statusCounts.Completed}</span>
//             </div>
//           </div>
//         )}

//         <div id="button">
//           {/* <button
//               onClick={() => {
//                 setShowForm((prev) => !prev);
//                 setIsVisible((prev) => !prev); // Toggle visibility of the status div
//               }}
//               className="add-button"
//               id="changing-button"
//             >
//               {showForm ? "Back to Issues" : "Add Issue"}
//             </button> */}
//           <Link to="/issues/add" className="add-button" id="changing-button">
//             Add Issues
//           </Link>
//         </div>

//         {showForm ? (
//           <IssueInput addIssue={addIssue} />
//         ) : (
//           <IssueList
//             issues={issues}
//             updateStatus={updateStatus}
//             deleteIssue={deleteIssue}
//           />
//         )}
//       </div>
//     </>
//   );
// }
