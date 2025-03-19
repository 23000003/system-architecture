import prisma from "../prisma/prisma";
import { CreatePost, UpdatePost } from "./type";
import { GraphQLError } from 'graphql';
import { pubsub } from "./graphql.resolvers";

export default class PostServices {
    static async getAllPosts() {
        return await prisma.post.findMany();
    }

    static async getPostById(id: number) {
        return await prisma.post.findFirst({
            where: { id }
        });
    }

    static async createPost(args: CreatePost) {
        const { title, content, authorId } = args;
        pubsub.publish("POST_ADDED", { postAdded: args });

        return await prisma.post.create({
            data: {
                title,
                content,
                authorId
            }
        });
    }    

    static async updatePost(args: UpdatePost) {
        const { id, title, content } = args;

        if(!title && !content) {
            throw new GraphQLError('Title or Content Field Required!.', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                },
            });
        }

        try {
            return await prisma.post.update({
                where: { id },
                data: {
                    title: title,
                    content: content
                }
            });
        } catch(err) {
            throw new GraphQLError('Post Not Found!', {
                extensions: {
                    code: 'NOT_FOUND',
                },
            });
        }
    }

    static async deletePost(id: number) {
        try {
            await prisma.post.delete({
                where: { id }
            });
            return 'Post Deleted Successfully!';
        }catch(err) {
            throw new GraphQLError('Post Not Found!', {
                extensions: {
                    code: 'NOT_FOUND',
                },
            });
        }
    }
}