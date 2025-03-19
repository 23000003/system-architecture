import { ApolloServer } from "apollo-server-express";
import { createServer } from 'http';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import postSchema from "./graphql.schema";
import postResolvers from "./graphql.resolvers";

async function startServer() {
    const app = express();
    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs: postSchema,
        resolvers: postResolvers,
    });

    const subscriptionServer = SubscriptionServer.create(
        { 
            schema,
            execute,
            subscribe,
        },
        {
            server: httpServer,
            path: '/graphql',
        }
    );

    const server = new ApolloServer({
        schema,
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                };
            }
        }],
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = 4001;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
}

startServer().catch((err) => {
    console.error('Error starting post service apollo server:', err);
});