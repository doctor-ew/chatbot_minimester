import axios from 'axios';

// Interfaces for TypeScript type safety
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
    rarity: string;
    basehp: number;
    baseatk: number;
    basedef: number;
    basespd: number;
    basexp: number;
    stattotal: number;
    dimensions: string;
    where_found: [string];
}


// Utility function to fetch data from a URL
const fetchData = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data.results || response.data; // Accommodate different response structures
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

// Filtering utility for PocketMorties
const filterPocketMorties = (data: any[], args: any) => {
    return data.filter(morty => {
        //console.log('|-m-|', morty);
        return (!args.type || args.type.includes(morty.type)) &&
            (!args.rarity || args.rarity.includes(morty.rarity)) &&
            (args.basexp === undefined || morty.basexp === args.basexp) &&
            (args.basehp === undefined || morty.basehp === args.basehp) &&
            (args.baseatk === undefined || morty.baseatk === args.baseatk) &&
            (args.basedef === undefined || morty.basedef === args.basedef) &&
            (args.basespd === undefined || morty.basespd === args.basespd) &&
            (args.stattotal === undefined || morty.stattotal === args.stattotal) &&
            (!args.dimensions || args.dimensions.includes(morty.dimensions)) &&
            (!args.where_found || args.where_found.some((location: any) => morty.where_found.includes(location)));
    });
};


// Utility function for sorting and limiting

const sortData = (data: any[], sortBy: string) => {
    if (sortBy) {
        return [...data].sort((a, b) => b[sortBy] - a[sortBy]);
    }
    return data;
};

const resolvers = {
    Query: {
        pocketMorties: async (_: any, args: any) => {
            const data = await fetchData('https://www.doctorew.com/shuttlebay/cleaned_pocket_morties.json');
            let filteredData = filterPocketMorties(data, args);

            // Sort the filtered data
            filteredData = sortData(filteredData, args.sortBy);

            // Apply offset and limit for pagination
            const offset = args.offset || 0;
            const limit = (typeof args.limit === 'number' && args.limit >= 0) ? parseInt(args.limit) : filteredData.length;

            // Adjust the slicing indices if necessary
            const endIndex = Math.min(offset + limit, filteredData.length);
            return filteredData.slice(offset, endIndex);
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
