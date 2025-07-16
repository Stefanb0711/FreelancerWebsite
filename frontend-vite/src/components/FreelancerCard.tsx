import type {FreelancerUser} from "../models/FreelancerUser.model.ts";

export default function FreelancerCard({username, languages, services, biography, rating}: FreelancerUser) {

    //kommrnr
    return (
        <div>
            <h2>{{username}}</h2>

            <h3>Languages</h3>
            <ul>
                {languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}

            </ul>
            <ul>
                {services.map((service, index) => (
                    <li key={index}>{service.name}</li>
                ))}
            </ul>
        </div>
    )
}