import React from 'react';


export function Register() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Registrieren
                </h2>
                <form>
                    {/* Voller Name */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                            Vollständiger Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Dein Name"
                        />
                    </div>

                    {/* E-Mail-Adresse */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            E-Mail-Adresse
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="beispiel@email.com"
                        />
                    </div>

                    {/* Passwort */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Passwort
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Passwort"
                        />
                    </div>

                    {/* Registrieren-Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Registrieren
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}