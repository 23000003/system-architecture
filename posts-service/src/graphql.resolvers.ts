import { PubSub } from "graphql-subscriptions";
import PostServices from "./post.services";
import { CreatePost, UpdatePost } from "./type";
import { execute, subscribe } from "graphql";

export const pubsub = new PubSub();

const postResolvers = {
    Query: {
        getAllPost: async () => PostServices.getAllPosts(),
        getPostById: async (
            _: null, 
            args: { id: number }
        ) => PostServices.getPostById(args.id),
    },
    Mutation: {
        createPost: async (
            _: null,
            args: CreatePost,
        ) => PostServices.createPost(args),
        updatePost: async (
            _: null,
            args: UpdatePost,
        ) => PostServices.updatePost(args),
        deletePost: async (
            _: null,
            args: { id: number }
        ) => PostServices.deletePost(args.id),
    },
    Subscription: {
        postAdded: {
            subscribe: () => pubsub.asyncIterableIterator(["POST_ADDED"]),
        },
    },
}

export default postResolvers;