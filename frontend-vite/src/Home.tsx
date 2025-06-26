import React, {useEffect, useState} from 'react';
import authService from "./services/AuthService.service.ts";
//import authService from "./services/AuthService.service.ts";


function Home() {

    const [isUserloggedIn, setIsUserLoggedIn] = useState<boolean>(authService.userLoggedIn);

    useEffect(() => {

        authService.authToken = localStorage.getItem('authToken');
        const result = authService.isTokenValid();
        setIsUserLoggedIn(result);


        authService.userLoggedIn = result;


        console.log("AuthService.userLoggedIn: ", authService.userLoggedIn);

        console.log('Current Authtoken: ', authService.authToken);
    }, []);

    return (

        <div>

            {authService.userLoggedIn && (
                <div>
                    <div className="flex items-center justify-center h-screen bg-gray-100">
                        <h1 className="text-4xl font-bold text-blue-500">
                            Willkommen in Tailwind CSS!
                        </h1>
                    </div>
                </div>

            )}

            {!authService.userLoggedIn && (
                <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div
                        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg flex items-center shadow-md max-w-md">
                        <svg className="w-8 h-8 mr-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.516 11.591c.745 1.327-.205 2.985-1.742 2.985H3.484C1.947 17.675.998 16.017 1.743 14.69L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a.75.75 0 01-.75-.75V8a.75.75 0 011.5 0v3.25a.75.75 0 01-.75.75z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <div>
                            <p className="font-bold">Anmeldung erforderlich</p>
                            <p>Bitte melden Sie sich <a href="login"
                                                        className="font-medium text-yellow-600 hover:underline">hier</a> an,
                                um diese Funktion nutzen zu können.</p>
                        </div>
                    </div>
                </div>
            )}

        </div>


    )

}


export default Home;