import prisma from "../prisma/prisma";
import { CreateUser, UpdateUser } from "./type";
import { GraphQLError } from 'graphql';

export default class UserServices {
    static async getAllUsers() {
        return await prisma.user.findMany();
    }

    static async getUserById(id: number) {
        return await prisma.user.findFirst({
            where: { id }
        });
    }

    static async createUser(args: CreateUser) {
        const { username, password } = args;
        return await prisma.user.create({
            data: {
                username,
                password
            }
        });
    }    

    static async updateUser(args: UpdateUser) {
        const { id, username, password } = args;

        if(!username && !password) {
            throw new GraphQLError('Username or Password Field Required!.', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                },
            });
        }

        try {
            return await prisma.user.update({
                where: { id },
                data: {
                    username,
                    password
                }
            });
        } catch(err) {
            throw new GraphQLError('User Not Found!', {
                extensions: {
                    code: 'NOT_FOUND',
                },
            });
        }
    }

    static async deleteUser(id: number) {
        try {
            await prisma.user.delete({
                where: { id }
            });
            return 'User Deleted Successfully!';
        }catch(err) {
            throw new GraphQLError('User Not Found!', {
                extensions: {
                    code: 'NOT_FOUND',
                },
            });
        }
    }
}