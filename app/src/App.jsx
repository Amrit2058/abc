import HomePage from "./pages/home/home";
import AddIssuePage from "./pages/issues/add";
import ListIssues from "./pages/issues/IssuesList/IssuesList";
import ArchivedIssues from "./pages/archived/archivedList/ArchivedList";
import "./styles/app.css";
import "./styles/Global.css";

import { Routes, Route } from "react-router";


const App = () => {
  
  return (
    <>
    <Routes>
      <Route path="/"  element={<HomePage />} />
      <Route path="/issues/add" element={<AddIssuePage />} />
      <Route path="/issuesList" element={<ListIssues/>} />
      <Route path= "/archivedList" element={<ArchivedIssues/>} />
    </Routes>
    </>
  );
};

export default App;
