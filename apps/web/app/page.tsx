// /apps/web/app/page.tsx

'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {useQuery} from '@apollo/client';
import {apolloClient} from '../lib/apolloClient';
import Card from '../components/Card';
import {GET_POCKET_MORTIES_QUERY} from '../lib/graphqlQueries';
import {PocketMortyConnection} from '../lib/types';
import "./globals.css";

const RickAndMortyPage: React.FC = () => {
    const [morties, setMorties] = useState([]);
    const [endCursor, setEndCursor] = useState(null);
    const {loading, error, data, fetchMore} = useQuery<PocketMortyConnection>(GET_POCKET_MORTIES_QUERY, {
        variables: {first: 9, after: null},
        client: apolloClient,
        onCompleted: data => {
            console.log('|-o-| onCompleted', data);
            setMorties(data?.pocketMorties?.edges);
            setEndCursor(data?.pocketMorties?.pageInfo?.endCursor);
        }
    });

    const loadMoreMorties = useCallback(() => {
        if (!endCursor || loading) return;

        fetchMore({
            variables: {
                after: endCursor,
            },
        }).then(fetchMoreResult => {
            setMorties(prevMorties => [...prevMorties, ...fetchMoreResult.data.pocketMorties.edges]);
            setEndCursor(fetchMoreResult.data.pocketMorties.pageInfo.endCursor);
        });
    }, [endCursor, loading, fetchMore]);

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user is near the bottom of the page
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                loadMoreMorties();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreMorties]);

    if (loading && !data) return <p>Loading...</p>;
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
                {loading && <p>Loading more...</p>}
            </div>
        </main>
    );
};

export default RickAndMortyPage;
