import {useState} from "react";
import React, { createContext } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const login = () => {
        setIsUserLoggedIn(true);
        console.log("User logged in");
    };

    const logout = () => {
        setIsUserLoggedIn(false);
        console.log("User logged out");
    }

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};