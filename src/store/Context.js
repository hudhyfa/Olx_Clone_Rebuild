import { useState, createContext, useContext } from "react";

export const FirebaseContext = createContext(null);

export const FirebaseContextHook = () => {
    return useContext(FirebaseContext)
}

export const AuthContext = createContext(null);

export default function Context( {children} ) {
    const [ user, setUser ] = useState(null)
    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}