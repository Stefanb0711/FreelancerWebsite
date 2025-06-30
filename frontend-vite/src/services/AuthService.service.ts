import {useQuery } from '@apollo/client';
//import client from "../../apollo-client.ts";
import {GraphQLClient} from "graphql-request";
import type {RegisterCustomerModel} from "../models/RegisterCustomer.model.ts";
import type {RegisterFreelancerModel} from "../models/RegisterFreelancer.model.ts";
import type {RegisterDataModel} from "../models/RegisterData.model.ts";
import type {LoginFormModel} from "../models/LoginForm.model.ts";


class AuthService {

    private static instance: AuthService;

    //private client: GraphQLClient;

    private client: GraphQLClient = new GraphQLClient('https://localhost:7115/graphql');


    private constructor() {
        //this.client = new GraphQLClient('https://localhost:44325/graphql');
    }

    public static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }



    public async LoginUser(loginData: LoginFormModel) {

        const LOGIN_USER = `
            mutation LoginUser($loginData: LoginInput!) {
              login(loginData: $loginData ) {
                message
                success
                token
              }
            }
        `;

        const variables = {
            loginData: loginData
        };

        try {

           const result = await this.client.request(
               LOGIN_USER, variables
           );

           console.log("Result of LoginUser: ", result);

           return result;

        } catch (e) {
            console.log("Error bei RegisterCustomer: ", e);

        }

    }




    public async RegisterUser(registrationData: RegisterDataModel | null) {

        /*
        const REGISTER_USER = gql`
            mutation RegisterUser($registrationData: RegisterUserInput!) {
                registerUser(registrationData: $registrationData) {
                    message
                    success
                }
            }
        `;*/

        const REGISTER_USER = `
            mutation RegisterUser($registrationData: RegisterInput!) {
                register(registrationData: $registrationData) {
                    message
                    success
                }
            }
        `;


        const variables = {
            registrationData: registrationData
        }

        try {
            const result = await this.client.request(
                REGISTER_USER, variables
            );
            return result;
        } catch (error) {
            console.log("Error bei RegisterCustomer: ", error);
        }

    }

    /*
    public async RegisterFreelancer() {

        const REGISTER_FREELANCER = gql`
        mutation RegisterUser($registrationData: RegisterUserInput!) {
            
        }
         `
    };*/

    public async HelloQuery() {


        try {
            const QUERY_HELLO = `
            query Hello {
                hello {
                hello 
                }
            }
        `;


        const result = await this.client.request(
            QUERY_HELLO
        );

        console.log("Result of useQuery: ", result);


        return result;


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