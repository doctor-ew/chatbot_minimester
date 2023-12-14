'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POCKET_MORTY_QUERY } from '../../../lib/graphqlQueries'; // Ensure this is defined and imported correctly
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Initialize Apollo Client
const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
    cache: new InMemoryCache(),
});

const MortyPage = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split('/').pop() as string, 10);
    const [morty, setMorty] = useState(null);

    const { loading, error } = useQuery(GET_POCKET_MORTY_QUERY, {
        variables: { id },
        client: apolloClient,
        skip: isNaN(id),
        onCompleted: (data) => setMorty(data.pocketMorty),
    });

    useEffect(() => {
        if (isNaN(id)) console.log('Invalid Morty ID');
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!morty) return <div>Morty not found.</div>;

    return (
        <div>
            <h1>{morty.name}</h1>
            <div>Number: {morty.id}</div>
            <div>Type: {morty.type}</div>

            <div className="stats-box">
                {/* Display stats */}
            </div>

            <div className="images-and-info">
                <img src={`https://pocketmortys.net/media/com_pocketmortys/assets/${morty.assetid}Front.png`}
                     alt={`${morty.name} Front`}/>
                <img src={`https://pocketmortys.net/media/com_pocketmortys/assets/${morty.assetid}Back.png`}
                     alt={`${morty.name} Back`}/>
                {/* Info grid */}
            </div>
        </div>
    );
};

export default MortyPage;
