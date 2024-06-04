import { useState } from "react";
import { createContext } from "react";
export const HistoriqueContext = createContext()
export const HistoriqueProvider = ({ children }) => {
    const [historiques, setHistoriques] = useState([])
    return (
        <HistoriqueContext.Provider value={{ historiques, setHistoriques }}>
            { children }
        </HistoriqueContext.Provider>
    );
};
