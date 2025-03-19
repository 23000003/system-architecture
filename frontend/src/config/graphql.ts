import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: (operation) => {
        if (operation.operationName === "GetAllUser") {
            return 'http://localhost:4002/graphql';
        }
        return 'http://localhost:4001/graphql';
    }
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4001/graphql',
    connectionParams: {
        authentication: "Its Me!",
    },
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;