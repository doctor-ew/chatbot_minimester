import React from 'react';
import Image from 'next/image';

interface CardProps {
    className: string;
    key: string;
    title: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
}

const Card: React.FC<CardProps> = ({ className, key, title, href, imageSrc, imageAlt }) => (
    <div className={className} key={key}>
        <h2>{title}</h2>
        <a href={href}>
            <Image src={imageSrc} alt={imageAlt} width={100} height={100} />
        </a>
    </div>
);

export default Card;
