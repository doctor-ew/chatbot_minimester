import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
        uri: 'http://localhost:4000/rickmorty',
    }),
    cache: new InMemoryCache(),
});
