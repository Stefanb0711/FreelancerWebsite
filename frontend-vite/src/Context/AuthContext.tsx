import React, { createContext, useContext, useState } from 'react';
import authService from '../services/AuthService.service';

// Definition der Schnittstelle für den AuthContext
interface AuthContextType {
    isUserLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

// Erstellen eines React Contexts
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within an AuthProvider");

    return context;
};
