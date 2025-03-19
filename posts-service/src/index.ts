import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import postSchema from "./graphql.schema";
import postResolvers from "./graphql.resolvers";
import cors from 'cors';

// I use the Latest version of Apollo Graphql to work with Websockets

// ** @CODE REFERENCE TO START APOLLO SERVER WITH WEBSOCKETS
// https://www.apollographql.com/docs/apollo-server/data/subscriptions


async function startServer() {
  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs: postSchema, resolvers: postResolvers });

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({ 
    schema,

    // **** not in the reference but dis is to identify the connection ****
    onConnect: (ctx) => {
      console.log('Client connected:', ctx.connectionParams);
    },
    onDisconnect: (ctx) => {
      console.log('Client disconnected');
    }

  }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server),
  );

  const PORT = 4001;
  httpServer.listen(PORT, () => {
    console.log(`Apollo Server Posts Service is now running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
