const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, gql } = require('apollo-server');
const { typeDefs, resolvers } = require('../src/graphql/rickmorty/resolvers');



const { readFileSync } = require('fs');
const path = require('path');

// Reading GraphQL schema
//const typeDefs = readFileSync(path.join(__dirname, '../src/graphql/rickmorty/schema.graphql'), 'utf-8');

const server = new ApolloServer({ typeDefs, resolvers });

const { query } = createTestClient(server);

describe('GraphQL Queries', () => {
    it('fetches filtered pocket Morties', async () => {
        const GET_MORTIES = gql`
            query GetMorties($type: [String]) {
                pocketMorties(type: $type) {
                    id
                    name
                    type
                }
            }
        `;

        const res = await query({ query: GET_MORTIES, variables: { type: ["Rock"] } });
        expect(res.data.pocketMorties).toBeDefined();
        expect(res.data.pocketMorties).toEqual(expect.arrayContaining([
            expect.objectContaining({ type: 'Rock' })
        ]));
    });

    // Additional test cases...
});
