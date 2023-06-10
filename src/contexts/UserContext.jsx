import { onAuthStateChanged } from "@firebase/auth";
import React, { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

export const UserContext = createContext(null);

export function UserContextProvider({ children }){
    const [user, setUser ] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser) {
                setUser({
                    id: firebaseUser.id,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName,
                })
            }
        } )
    }, [])
    return <UserContext.Provider value = {{
        user: {
            name: "Rolando",
            email: "rolando4693@gmail.com",
            age: 21,
        },
    }}>{children}
    </UserContext.Provider>        
}

export function useUser() {
    return useContext(userContext);
}