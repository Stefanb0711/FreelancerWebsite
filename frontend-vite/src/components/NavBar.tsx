import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../App.tsx";

export function NavBar() {


    const [signedIn, setSignedIn] = useContext(AuthContext);


    return (

        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo oder Home Link */}
                <Link
                    to="/"
                    className="text-xl font-bold hover:text-gray-200 transition duration-300"
                >
                    MyApp
                </Link>

                {/* Hauptlinks */}
                <div className="flex items-center space-x-4">
                    {signedIn ? (
                        // Anzeigen, wenn Benutzer angemeldet ist
                        <button
                            onClick={() => setSignedIn(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        // Anzeigen, wenn Benutzer nicht angemeldet ist
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="hover:text-gray-200 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register/step1"
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>

    );
}