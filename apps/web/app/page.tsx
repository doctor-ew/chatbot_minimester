import React from 'react';
import { MortiesDisplay } from './MortiesDisplay'; // Adjust the import path as necessary
import { useQuery } from '@apollo/client';
import { GET_POCKET_MORTIES_QUERY } from './graphqlQueries';
import styles from "./page.module.css";

export default function Page(): JSX.Element {
    // Use Apollo's useQuery hook to fetch data
    const { loading, error, data } = useQuery(GET_POCKET_MORTIES_QUERY, {
        variables: {
            first: 10,
            after: null, // Adjust this as needed for pagination
            type: null, // Adjust this based on user selection
            sortBy: null,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // Extract 'pocketMorties' from data, or use an empty array if data is undefined
    const morties = data?.pocketMorties.edges.map((edge:any) => edge.node) || [];

    return (
        <main className={styles.main}>
            {/* Other content... */}
            <MortiesDisplay morties={morties} />
            {/* Other content... */}
        </main>
    );
}
