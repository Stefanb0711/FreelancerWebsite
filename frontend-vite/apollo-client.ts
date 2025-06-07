import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://localhost:44325/graphql', // GraphQL-Endpunkt
    cache: new InMemoryCache(), // Cache für Daten
});

export default client;