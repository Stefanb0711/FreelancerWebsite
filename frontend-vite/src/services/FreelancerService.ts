import {GraphQLClient} from "graphql-request";


class FreelancerService {

    private static instance: FreelancerService;

    private client: GraphQLClient = new GraphQLClient('https://localhost:7115/graphql');

    public randomFreelancers: any;
    public allFreelancers: any;

    private constructor() {

    }

    public static getInstance() {
        if (!FreelancerService.instance) {
            FreelancerService.instance = new FreelancerService();
        }
        return FreelancerService.instance;

    }


    public async GetRandomFreelancers() {

        try {

            const GET_RANDOM_FREELANCERS = `
            query GetRandomFreelancers {
                getRandomFreelancers {
                    message
                    success
                    freelancerUsers {
                        username
                        biography
                        languages
                        services {
                            name
                            price
                            }
                        }
                    }
                }
            `;



            /*
            * freelancerUsers {
                             name
                             language
                             biography
                             services {
                                name
                                price
                             }
                        }
            * */

            const result = await this.client.request(
                GET_RANDOM_FREELANCERS
            );

            this.randomFreelancers = result.getRandomFreelancers.freelancerUsers;
            console.log("Random Freelancers: ", this.randomFreelancers);

            //console.log("Result of GetFreelancers: ", result);

            return result;


        } catch (error) {
            console.log("Error bei GetFreelancers: ", error);
        }

    }


    public async GetAllFreelancers() {

        try {


            const GET_ALL_FREELANCERS = `
            
                query GetAllFreelancers {
                    getAllFreelancers {
                        message
                        success
                        freelancerUsers {
                        username
                        biography
                        languages
                        services {
                            name
                            price
                            }  
                        }
                    }
                }
            `;

            const result = await this.client.request(
                GET_ALL_FREELANCERS
            );


            this.allFreelancers = result.getAllFreelancers.freelancerUsers;
            console.log("Random Freelancers: ", this.allFreelancers);
            return result;

        } catch (error) {
            console.log("Error bei GetAllFreelancers: ", error);
        }

    }

}

export default FreelancerService.getInstance();