const { filterPocketMorties } = require('../src/graphql/rickmorty/resolvers');
//import { filterPocketMorties } from '../src/graphql/rickmorty/resolvers';

describe('filterPocketMorties', () => {
    it('should filter Morties by type', () => {
        const mockData = [{ type: 'Rock' }, { type: 'Paper' }];
        const args = { type: ['Rock'] };
        const result = filterPocketMorties(mockData, args);
        expect(result).toEqual([{ type: 'Rock' }]);
    });

    it('should filter Morties by rarity', () => {
        const mockData = [{ rarity: 'Common' }, { rarity: 'Rare' }];
        const args = { rarity: ['Rare'] };
        const result = filterPocketMorties(mockData, args);
        expect(result).toEqual([{ rarity: 'Rare' }]);
    });

    // Additional test cases...
});
