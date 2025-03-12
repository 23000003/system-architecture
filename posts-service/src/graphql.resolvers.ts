import PostServices from "./post.services";
import { CreatePost, UpdatePost } from "./type";

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
    }
}

export default postResolvers;