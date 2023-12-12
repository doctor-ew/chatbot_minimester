'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_POCKET_MORTIES_QUERY } from './graphqlQueries';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Apollo Client Setup
const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
        uri: 'http://localhost:4000/rickmorty',
    }),
    cache: new InMemoryCache(),
});

// Assuming you have a Card component
const Card = ({ className, key, title, href, children }) => (
    <div className={className} key={key}>
        <h2>{title}</h2>
        <a href={href}>{children}</a>
    </div>
);
const RickAndMortyPage = () => {
    const { loading, error, data } = useQuery(GET_POCKET_MORTIES_QUERY, {
        variables: { first: 10, after: null, type: null, sortBy: null },
        client: apolloClient
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Pocket Morties</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {console.log('|-d-|', data)}
                {data?.pocketMorties.edges.map(({ node }) => (
                    <Card
                        className="bg-white rounded-lg shadow-md p-4"
                        key={node.id}
                        title={node.name}
                        href={`/morty/${node.id}`}
                    >
                        <Image
                            src={`https://pocketmortys.net/media/com_pocketmortys/assets/${node.assetid}Front.png`}
                            alt={node.name}
                            width={100}
                            height={100}
                        />
                        {/* Additional details */}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RickAndMortyPage;
