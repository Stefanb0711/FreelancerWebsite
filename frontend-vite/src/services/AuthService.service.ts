import { gql } from '@apollo/client';
import {useQuery } from '@apollo/client';
import client from "../../apollo-client.ts";
import {GraphQLClient} from "graphql-request";
import type {RegisterCustomerModel} from "../models/RegisterCustomer.model.ts";
import type {RegisterFreelancerModel} from "../models/RegisterFreelancer.model.ts";

class AuthService {

    private static instance: AuthService;

    //private client: GraphQLClient;


    private constructor() {
        //this.client = new GraphQLClient('https://localhost:44325/graphql');
    }

    public static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public LoginUser() {

    }


    public async RegisterCustomer(registrationData: RegisterCustomerModel | RegisterFreelancerModel, userType: string) {


        const REGISTER_CUSTOMER = gql`
            mutation RegisterUser($registrationData: RegisterUserInput!) {
                registerUser(registrationData: $registrationData) {
                    message
                    success
                }
            }
         `;

        const variables = {
            registrationData: registrationData,
            userType: userType
        }

        try {
            const result = await client.mutate({
                mutation: REGISTER_CUSTOMER,
                variables: variables
            });
            return result;
        } catch (error) {
            console.log("Error bei RegisterCustomer: ", error);
        }

    }

    public async RegisterFreelancer() {

        const REGISTER_FREELANCER = gql`
        mutation RegisterUser($registrationData: RegisterUserInput!) {}
         `
    }

    public async HelloQuery() {


        try {
            const QUERY_HELLO = gql`
            query Hello {
                hello {
                hello 
                }
            }
        `;


            const result = await client.query({
                query: QUERY_HELLO,
            });

            console.log("Result of useQuery: ", result);


            return result.data.hello;


        } catch (error) {
            console.log("Error bei HelloQuery: ", error);
        }


        /*
        const query: any = `
        query {
            hello {
            hello
            }
        }   
        `;

        try {
            const result: any = await this.client.request(query);
            console.log("Result of useQuery: ", result);
            return result.hello;
        } catch (error) {
            console.log("Error bei HelloQuery: ", error);
        }
    }
    */

    }

}

export default AuthService.getInstance();