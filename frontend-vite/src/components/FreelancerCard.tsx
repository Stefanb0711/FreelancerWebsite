import type {FreelancerUser} from "../models/FreelancerUser.model.ts";

//{username, languages, services, biography, rating}
export default function FreelancerCard(props: {freelancer: FreelancerUser}) {

    const freelancer = props.freelancer;

    return (
        <div>

            <h2>{freelancer.username}</h2>

            <h3>Languages</h3>
            <ul>
                {freelancer.languages?.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}

            </ul>
            <ul>

                {freelancer.services?.map((service, index) => (
                    <li key={index}>{service.name}</li>
                ))}

            </ul>
        </div>
    )
}