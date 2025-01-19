import HomePage from "./pages/home";
import AddIssuePage from "./pages/issues/add";
import EditIssue from "./pages/issues/edit";
import "./styles/app.scss";

import { Routes, Route } from "react-router";
import IssueContextProvider from "./context/issue";


const App = () => {
  
  return (
    <IssueContextProvider>
      <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/issues/add" element={<AddIssuePage />} />
        <Route path="/issues/edit/:id" element={<EditIssue />} />
      </Routes>
    </IssueContextProvider>
  );
};

export default App;
