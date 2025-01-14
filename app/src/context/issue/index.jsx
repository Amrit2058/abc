import { createContext, useState } from "react";

export const issueContext = createContext({
    issues: [],
    setIssues: () => {}
});


export default function IssueContextProvider({children}) {
    const [issues, setIssues] = useState([]);

    return (
        <issueContext.Provider value={{issues, setIssues}}>
            {children}
        </issueContext.Provider>
    )
};