import React, {useContext, useEffect} from 'react';
import {AuthContext} from "./App.tsx";
import FreelancerService from "./services/FreelancerService.ts";


function Home() {


    const [signedIn, setSignedIn] = useContext(AuthContext);




    useEffect(() => {
        const fetchFreelancers = async () => {

            if (signedIn) {
                try {
                    const getFreelancersResult = await FreelancerService.GetFreelancers();
                    console.log("GetFreelancersResult: ", getFreelancersResult);

                } catch (error) {

                }
            }


        }

        fetchFreelancers();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {signedIn && (
                <h1 className="text-4xl font-bold text-blue-500">
                    Beliebte Freelancer
                </h1>
            )};
            {!signedIn && (
                <div>
                    <h3>Bitte logge dich ein, um auf Inhalte zugreifen zu könnne</h3>
                </div>
            )}

        </div>
    )

}


export default Home;