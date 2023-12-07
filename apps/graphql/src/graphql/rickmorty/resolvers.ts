import axios from 'axios';

// Assuming Character represents the structure of a character from the Rick and Morty API
interface Character {
    id: string;
    name: string;
    // ... other fields that characters contain
}


// Helper function to determine if a Rick and Morty should be associated
const shouldAssociate = (rick: any, morty: any) => {
    if (rick.origin?.id && morty.origin?.id && rick.origin.id === morty.origin.id) {
        return true;
    }
    if (rick.origin?.name === 'unknown' && morty.origin?.name === 'unknown') {
        const rickNamePattern = rick.name.replace('Rick', '').trim();
        const mortyNamePattern = morty.name.replace('Morty', '').trim();
        return rickNamePattern === mortyNamePattern;
    }
    if (rick.location?.id && morty.location?.id && rick.location.id === morty.location.id && rick.location.id !== '3') {
        return true;
    }
    return false;
};

// Function to transform Pocket Mortys data into a format similar to Rick and Morty API data
const transformPocketMortyData = (pocketMortyData: any) => {
    // Implement logic to transform and return Pocket Morty data
    // Map fields from Pocket Morty to match those in the Character type
    return {
        id: pocketMortyData.assetid,
        name: pocketMortyData.name,
        // Add other necessary fields or placeholders
    };
};


const rickMortyResolvers = {
    Query: {
        charactersByName: async (_: any, args: { name: string }) => {
            const query = `
                {
                    characters(filter: {name: "${args.name}"}) {
                        results {
                            id
                            name
                            status
                            species
                            type
                            gender
                            image
                            origin {
                                id
                                name
                            }
                            location {
                                id
                                name
                            }
                        }
                    }
                }`;
            try {
                const response = await axios.post('https://rickandmortyapi.com/graphql', {query});
                return response.data.data.characters.results;
            } catch (error) {
                console.error("Error fetching characters:", error);
                return [];
            }
        },

        rickAndMortyAssociations: async () => {
            try {
                // Fetching data from Rick and Morty API
                const ricksResponse = await axios.get('https://rickandmortyapi.com/api/character/?name=Rick');
                const mortiesResponse = await axios.get('https://rickandmortyapi.com/api/character/?name=Morty');
                const ricks = ricksResponse.data.results;
                const morties = mortiesResponse.data.results;

                // Fetching data from Pocket Mortys API
                const pocketMortysResponse = await axios.get('https://pocketmortys.net/components/com_pocketmortys/json/datatables/MortysTable_en.json');
                const pocketMortys = pocketMortysResponse.data.data.map(transformPocketMortyData);

                // Combine and process data from both sources
                const combinedMorties = [...morties, ...pocketMortys];
                let orphanedMorties = [...combinedMorties];

                const associations = ricks.map((rick:Character) => {
                    const associatedMorties = combinedMorties.filter(morty => shouldAssociate(rick, morty));
                    orphanedMorties = orphanedMorties.filter(morty => !associatedMorties.includes(morty));
                    return { rick, morties: associatedMorties };
                });


                return {
                    associations,
                    orphanedMorties
                };
            } catch (error) {
                console.error("Error in rickAndMortyAssociations:", error);
                return {
                    associations: [],
                    orphanedMorties: []
                };
            }
        },
    }
};

export default rickMortyResolvers;
