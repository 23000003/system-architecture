
const postSchema = `
    type Post {
        id: Int!
        title: String!
        content: String!
        authorId: Int!
        date_posted: String!
    }

    type Query {
        getAllPost: [Post]!
        getPostById(id: Int!): Post
    }
    type Mutation {
        createPost(title: String!, content: String!, authorId: Int!): Post!
        updatePost(id: Int!, title: String, content: String): Post
        deletePost(id: Int!): String!
    }
    type Subscription {
        postAdded(): Post!
    }
`

export default postSchema;