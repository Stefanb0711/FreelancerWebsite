import React, {useContext} from 'react';
import {AuthContext} from "./App.tsx";


function Home() {


    const [signedIn, setSignedIn] = useContext(AuthContext);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {signedIn && (
                <h1 className="text-4xl font-bold text-blue-500">
                Willkommen in Tailwind CSS!
                </h1>
            )};
            {!signedIn && (
                <div>
                    <h3>Bitte logge dich ein</h3>
                </div>
            )}

        </div>
    )

}


export default Home;