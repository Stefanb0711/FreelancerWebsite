import React, {useState, useEffect, useContext} from 'react';
import AuthService from "../services/AuthService.service.ts";
import type {LoginFormModel} from "../models/LoginForm.model.ts";
import {useNavigate} from "react-router";
import {AuthContext} from "../App.tsx";

export function Login() {

    const [errorMessage, setErrorMessage] = useState<string>('');

    const [signedIn, setSignedIn] = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async ()  => {

        const result: any = await AuthService.LoginUser(loginForm);

        console.log('Result of LoginUser Message: ', result.login.message);


        if (result.login.success === true) {
            setSignedIn(true);

            navigate('/');

        } else if (result.login.success === false) {
            setErrorMessage(result.login.message);

            console.log('Errormessage: ', result.login.message);
        }

        console.log('LoginForm: ', loginForm);
    };

    const [loginForm, setLoginForm] = useState<LoginFormModel >({
        usernameOrEmail: "",
        password: ""
    });

    return (


        <div className={'transition-all duration-500 ease-in-out flex items-center justify-center min-h-screen bg-gray-100'}>
            <div className="w-full max-w-md bg-white p-8 rounded shadow-lg"  >
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Einloggen
                    </h2>
                    <form>
                        {/* Benutzername */}
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                                Benutzername oder Email
                            </label>
                            <input
                                onChange={(e) => setLoginForm({ ...loginForm, usernameOrEmail: e.target.value })}
                                value={loginForm?.usernameOrEmail}
                                type="text"
                                id="fullName"
                                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Max222 / max@gmail.com"
                            />
                        </div>



                        {/* Passwort */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                Passwort
                            </label>
                            <input
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Passwort"
                            />
                        </div>



                        {/* Login-Button */}
                        <div className="mt-6">
                            <button
                                onClick={() => onSubmit()}
                                type="button"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Einloggen
                            </button>
                        </div>

                        { errorMessage !== '' && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-auto my-4 text-center" role="alert">
                                <strong className="font-bold m-auto">Fehler:</strong>
                                <p className="block sm:inline ml-2 m-auto">{errorMessage}</p>
                            </div>

                        )}

                    </form>
                </div>
            </div>

        </div>


    );
}