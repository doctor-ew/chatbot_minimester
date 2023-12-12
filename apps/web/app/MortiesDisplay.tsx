// MortiesDisplay.tsx
import React from 'react';
import Image from 'next/image';
import { Card } from '@repo/ui/card';
import styles from './MortiesDisplay.module.css'; // Create and define your styles

type MortyNode = {
    id: string;
    name: string;
    type: string;
    assetid: string;
    // Add other fields as necessary
};

type Props = {
    morties: { node: MortyNode }[];
};

export const MortiesDisplay: React.FC<Props> = ({ morties }) => {
    return (
        <div className={styles.grid}>
            {morties.map(({ node }) => (
                <Card
                    className={styles.card}
                    key={node.id}
                    title={node.name}
                    href={`/morty/${node.id}`} // Adjust as needed
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
    );
};
