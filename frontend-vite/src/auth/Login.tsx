import React, {useState} from 'react';
import AuthService from "../services/AuthService.service.ts";
import type {LoginFormModel} from "../models/LoginForm.model.ts";

export function Login() {


    const onSubmit = async ()  => {

        await AuthService.LoginUser()
    };

    const [loginForm, setLoginForm] = useState<LoginFormModel | null>(null)

    return (

        <div className="w-full max-w-md bg-white p-8 rounded shadow-lg"  >
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Registrieren
                </h2>
                <form>
                    {/* Benutzername */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                            Benutzername oder Email
                        </label>
                        <input
                            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
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



                    {/* Registrieren-Button */}
                    <div className="mt-6">
                        <button
                            onClick={() => onSubmit()}
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Registrieren
                        </button>
                    </div>



                </form>
            </div>
        </div>

    );
}