import { gql } from '@apollo/client';
import {useQuery } from '@apollo/client';
import client from "../../apollo-client.ts";
import {GraphQLClient} from "graphql-request";

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


    public RegisterUser() {

        const REGISTER_USER = gql`
            mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
            }
         `;
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