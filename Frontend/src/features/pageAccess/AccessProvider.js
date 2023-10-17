import { createContext, useState } from "react";

const AccessContext = createContext({});

export const AccessProvider = ({ children }) => {
    const [level, setLevel] = useState([{}]);

    return (
        <AccessContext.Provider value={{ roles, setRoles }}>
            { children }
        </AccessContext.Provider>
    )
}

export default AccessContext;