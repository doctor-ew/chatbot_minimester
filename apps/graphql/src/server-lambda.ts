import { ApolloServer, gql } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import path from 'path';
import { readFileSync } from 'fs';
import rickMortyResolvers from './graphql/rickmorty/resolvers';

// Load type definitions
const rickMortyTypeDefs = gql(readFileSync(path.join(__dirname, 'graphql/rickmorty/schema.graphql'), 'utf-8'));

// Create ApolloServer instance
const rickMortyServer = new ApolloServer({
    typeDefs: rickMortyTypeDefs,
    resolvers: rickMortyResolvers,
    introspection: true,
});

const rickMortyHandler = rickMortyServer.createHandler();

// Lambda handler
exports.handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return rickMortyHandler(event, context, callback);
    // Default response for unsupported paths
    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
    };
};
