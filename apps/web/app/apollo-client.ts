// apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql', // Your GraphQL endpoint
        fetch,
    }),
    cache: new InMemoryCache(),
});
