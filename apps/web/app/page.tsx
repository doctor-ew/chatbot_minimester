// /apps/web/app/page.tsx

'use client';

import React from 'react';
import {useQuery} from '@apollo/client';
import Image from 'next/image'; // Don't forget to import Image from 'next/image'
import {GET_POCKET_MORTIES_QUERY} from '../lib/graphqlQueries';
import {apolloClient} from '../lib/apolloClient';
import Card from '../components/Card';
import { PocketMortyConnection } from '../lib/types';
import "./globals.css";



const RickAndMortyPage: React.FC = () => {
    const {loading, error, data} = useQuery<PocketMortyConnection>(GET_POCKET_MORTIES_QUERY, {
        variables: {first: 9, after: null, type: null, sortBy: null},
        client: apolloClient
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className=" mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Pocket Morties</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.pocketMorties.edges.map(({node}) => (
                        <Card
                            className="bg-white rounded-lg shadow-md p-4"
                            key={node.id}
                            title={node.name}
                            href={`/morty/${node.id}`}
                            imageSrc={`https://pocketmortys.net/media/com_pocketmortys/assets/${node.assetid}Front.png`}
                            imageAlt={node.name}
                            type={node.type}
                            basehp={node.basehp}
                            baseatk={node.baseatk}
                            // ... other properties as needed
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default RickAndMortyPage;
