import { ApolloServer } from "apollo-server";
import postSchema from "./graphql.schema";
import postResolvers from "./graphql.resolvers";
import SeedDatabase from "../prisma/seed";
import { SubscriptionServer } from "subscriptions-transport-ws";

const server = new ApolloServer({
    typeDefs: postSchema,
    resolvers: postResolvers,
})

server.listen(4001).then(({ url }) => {
    
    // SeedDatabase().then(() => {
    //     console.log('Database Seeded Successfully!')
    // }).catch((err) => {
    //     console.log('Error Seeding Database:', err)
    // });

    console.log(`Post Graphql Apollo-Server is running on ${url} !!`)
})
