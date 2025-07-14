import {GraphQLClient} from "graphql-request";


class FreelancerService {

    private static instance: FreelancerService;

    private client: GraphQLClient = new GraphQLClient('https://localhost:44325/graphql');

    private constructor() {

    }

    public static getInstance() {
        if (!FreelancerService.instance) {
            FreelancerService.instance = new FreelancerService();
        }
        return FreelancerService.instance;

    }


    public async GetFreelancers() {

        try {

            const GET_FREELANCERS = `
                query GetFreelancers {
                      getFreelancers {
                        message
                        success
                        freelancerUsers {
                             name
                             email
                        }
                    }
                }
            `;

            const result = await this.client.request(
                GET_FREELANCERS
            );

            console.log("Result of GetFreelancers: ", result);

            return result;


        } catch (error) {
            console.log("Error bei GetFreelancers: ", error);

        }

    }

}

export default FreelancerService.getInstance();