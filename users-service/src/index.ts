import { ApolloServer } from "apollo-server";
import userSchema from "./graphql.schema";
import userResolvers from "./graphql.resolvers";
import SeedDatabase from "../prisma/seed";

const server = new ApolloServer({
    typeDefs: userSchema,
    resolvers: userResolvers,
})

server.listen(4002).then(({ url }) => {
    
    // SeedDatabase().then(() => {
    //     console.log('Database Seeded Successfully!')
    // }).catch((err) => {
    //     console.log('Error Seeding Database:', err)
    // });

    console.log(`User Graphql Apollo-Server is running on ${url} !!`)
})
