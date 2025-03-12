
const userSchema = `
    type User {
        id: Int!
        username: String!
        password: String!
        date_created: String!
    }

    type Query {
        getAllUser: [User]!
        getUserById(id: Int!): User
    }
    type Mutation {
        createUser(username: String!, password: String!): User!
        updateUser(id: Int!, username: String, password: String): User
        deleteUser(id: Int!): String!
    }
`

export default userSchema;