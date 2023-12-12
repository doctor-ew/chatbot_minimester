'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import Image from 'next/image'; // Don't forget to import Image from 'next/image'
import { GET_POCKET_MORTIES_QUERY } from '../lib/graphqlQueries';
import { apolloClient } from '../lib/apolloClient';
import Card from '../components/Card';
import { PocketMortyConnection, PocketMorty } from '../types'; // Assuming you have defined these types

const RickAndMortyPage: React.FC = () => {
    const { loading, error, data } = useQuery<PocketMortyConnection>(GET_POCKET_MORTIES_QUERY, {
        variables: { first: 10, after: null, type: null, sortBy: null },
        client: apolloClient
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Pocket Morties</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.pocketMorties.edges.map(({ node }: { node: PocketMorty }) => (
                    <Card
                        className="bg-white rounded-lg shadow-md p-4"
                        key={node.id}
                        title={node.name}
                        href={`/morty/${node.id}`}
                        imageSrc={`https://pocketmortys.net/media/com_pocketmortys/assets/${node.assetid}Front.png`}
                        imageAlt={node.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default RickAndMortyPage;
