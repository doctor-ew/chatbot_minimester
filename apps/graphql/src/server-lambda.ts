import { ApolloServer } from 'apollo-server-lambda';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import path from 'path';
import { readFileSync } from 'fs';
import pocketMortyResolvers from './graphql/rickmorty/resolvers';

// Load type definitions
console.log('Loading type definitions from ...',__dirname);
const pocketMortyTypeDefs = readFileSync(path.join(__dirname, 'graphql/rickmorty/schema.graphql'), 'utf-8');

// Create the executable schema
const schema = makeExecutableSchema({
    typeDefs: pocketMortyTypeDefs,
    resolvers: pocketMortyResolvers,
});

// Create ApolloServer instance with the executable schema
const pocketMortyServer = new ApolloServer({
    schema,
    introspection: true,
});

const pocketMortyHandler = pocketMortyServer.createHandler();

// Lambda handler
exports.handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return pocketMortyHandler(event, context, callback);
};
