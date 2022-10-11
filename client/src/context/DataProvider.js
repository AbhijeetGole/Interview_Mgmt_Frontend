import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [err,setErr]=useState('');
    const [users,setUsers]=useState([]);
    const [candidates,setCandidates]=useState([]);
    const [interviews,setInterviews]=useState([]);

    return (
        <DataContext.Provider value={{ 
            auth, setAuth,
            err,setErr ,
            users,setUsers,
            candidates,setCandidates,
            interviews,setInterviews 
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;