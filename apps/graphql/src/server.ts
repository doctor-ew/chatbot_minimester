// /apps/graphql/src/server.ts

import express, {Express, Request, Response, NextFunction} from 'express';

import {ApolloServer} from 'apollo-server-express';
import {readFileSync} from 'fs';
import path from 'path';
import rickMortyResolvers from './graphql/rickmorty/resolvers';
import travelDataResolvers from './graphql/traveldata/resolvers';
import {RedisCache} from 'apollo-server-cache-redis';

const app: express.Application = express();
const PORT = 4000;

// Load type definitions for both endpoints
const rickMortyTypeDefs = readFileSync(path.join(__dirname, 'graphql/rickmorty/schema.graphql'), 'utf-8');
const travelDataTypeDefs = readFileSync(path.join(__dirname, 'graphql/traveldata/schema.graphql'), 'utf-8');

/*
const redisCache = new RedisCache({
    host: 'redis',
    port: 6379
});
*/

async function fetchMorties() {
    const response = await fetch('http://localhost:4000/rickmorty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `query GetPocketMorties($first: Int, $after: String, $type: [String], $sortBy: String) {
        pocketMorties(first: $first, after: $after, type: $type, sortBy: $sortBy) {
          edges {
            node {
              id
              name
              type
              assetid
              evolution
              evolutions
              rarity
              basehp
              baseatk
              basedef
              basespd
              basexp
              stattotal
              dimensions
              where_found
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`,
            variables: {
                first: 10,
                after: null, // Adjust this as needed for pagination
                type: null, // Adjust this based on user selection
                sortBy: null, // Adjust this based on user selection
            },
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}


// Create ApolloServer instances for both endpoints
const rickMortyServer = new ApolloServer({
    typeDefs: rickMortyTypeDefs,
    resolvers: rickMortyResolvers,
    //cache: redisCache,
    context: ({req, res}) => ({
        req,
        res,
        //  cache: redisCache,
    })
});

const travelDataServer = new ApolloServer({
    typeDefs: travelDataTypeDefs,
    resolvers: travelDataResolvers,
    //   cache: redisCache,
    context: ({req, res}) => ({
        req,
        res,
        //cache: redisCache,
    })
});

// Health Check Endpoint
app.get('/health', async (req: Request, res: Response) => {
    // Update this endpoint to check the health of other services if necessary
    res.status(200).send('OK');
});



// Create an asynchronous function to start the servers and apply middleware
async function startServer() {
    await rickMortyServer.start();
    rickMortyServer.applyMiddleware({app: app as any, path: '/rickmorty'});

    await travelDataServer.start();
    travelDataServer.applyMiddleware({app: app as any, path: '/traveldata'});

    app.listen(PORT, () => {
        console.log(`Rick and Morty GraphQL API available at http://localhost:${PORT}${rickMortyServer.graphqlPath}`);
        console.log(`Travel Data GraphQL API available at http://localhost:${PORT}${travelDataServer.graphqlPath}`);
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

}

// Call the asynchronous function
startServer().catch(error => {
    console.error(error);
    process.exit(1);
});
