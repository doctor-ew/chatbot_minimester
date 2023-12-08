import axios from 'axios';

// Interfaces for to provide typesafety for TypeScript
interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
    // ... other fields that characters contain
}

interface PocketMorty {
    id: number;
    name: string;
    type: string;
    image: string;
    evolution: number[];
    evolutions: number[];
    rarity: number;
    hp: number;
    atk: number;
    def: number;
    spd: number;
    // ... other fields as necessary
}

// Utility function to fetch data from a URL
const fetchData = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data.results || response.data;  // Accommodate different response structures
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

// Resolver functions
const resolvers = {
    Query: {
        pocketMorties: async (): Promise<PocketMorty[]> => {
            return fetchData('https://www.doctorew.com/shuttlebay/pocketmorties.json');
        },
        ricks: async (): Promise<Character[]> => {
            return fetchData('https://rickandmortyapi.com/api/character/?name=Rick');
        },
        morties: async (): Promise<Character[]> => {
            return fetchData('https://rickandmortyapi.com/api/character/?name=Morty');
        },
    },
};

export default resolvers;
