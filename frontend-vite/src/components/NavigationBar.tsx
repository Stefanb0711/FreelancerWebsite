import React, {use, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import authService from "../services/AuthService.service.ts";
import {useAuthContext} from "../Context/AuthContext";

const NavigationBar: React.FC = () => {

    const { isUserLoggedIn, logout } = useAuthContext();


    useEffect(() => {
        console.log("isUserloggedIn in navbar von AuthContext übergeben: ", isUserLoggedIn);

    }, []);


    //const [isUserloggedIn, setIsUserLoggedIn] = useState<boolean>(authService.userLoggedIn);

    /*
    useEffect(() => {

        setIsUserLoggedIn(authService.userLoggedIn);
        (console.log("isUserloggedIn in navbar: ", isUserLoggedIn));
    }, []);
    */

    /*
    function onLogoutUser() {
        authService.logoutUser();
        setIsUserLoggedIn(false);

    };*/


    return(

        <div>
            <nav className="bg-blue-600">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                            <div className="text-white text-xl font-bold">
                                <Link to="/">MeineApp</Link>
                            </div>
                            <div className="flex space-x-4">
                                <Link
                                    to="/"
                                    className="text-white hover:text-blue-200 transition duration-300">
                                    Home
                                </Link>

                                {!isUserLoggedIn && (
                                    <div>
                                        <Link to="/login" className="text-white hover:text-blue-200 transition duration-300">
                                            Login
                                        </Link>
                                        <Link
                                            to="/register/step1"
                                            className="text-white bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg transition duration-300">
                                            Register
                                        </Link>
                                    </div>

                                )}

                                {isUserLoggedIn && (
                                    <div>
                                        <button onClick={logout} className={'className="text-white hover:text-blue-200 transition duration-300'}>
                                            Logout
                                        </button>
                                    </div>


                                )}

                            </div>
                        </div>
                    </nav>

        </div>



    );
}

export default NavigationBar;