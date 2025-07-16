import React, {useContext, useEffect} from 'react';
import {AuthContext} from "./App.tsx";
import FreelancerService from "./services/FreelancerService.ts";
import FreelancerCard from "./components/FreelancerCard.tsx";
import type {FreelancerUser} from "./models/FreelancerUser.model.ts";


function Home() {


    const [signedIn, setSignedIn] = useContext(AuthContext);




    useEffect(() => {



        const fetchFreelancers = async () => {

            console.log("RandomFreelancers: ", FreelancerService.randomFreelancers);
            if (signedIn) {
                try {
                    console.log("GetRandomFreelancers");
                    await FreelancerService.GetRandomFreelancers();
                    console.log("GetRandomFreelancersResult: ", FreelancerService.randomFreelancers);

                } catch (error) {

                    console.log("Error bei GetFreelancers: ", error);
                }
            }

        }

        fetchFreelancers();

    }, [signedIn]);

    return (
        <div>

                {signedIn && (
                    <div>
                        <h1 className="text-4xl font-bold text-blue-500">
                            Beliebte Freelancer
                        </h1>

                        <ul>

                            {FreelancerService.randomFreelancers.map((freelancer, index) => (
                                <li key={freelancer.id}>
                                    {/*<FreelancerCard username={freelancer.username} languages={freelancer.languages} services={freelancer.services} biography={freelancer.biography} />*/}
                                    <strong>{freelancer.username}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!signedIn && (

                    <div>
                        <h3>Bitte logge dich ein, um auf Inhalte zugreifen zu könnne</h3>
                    </div>
                )}

        </div>
    )

}


export default Home;