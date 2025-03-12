import UserServices from "./user.services";
import { CreateUser, UpdateUser } from "./type";

const userResolvers = {
    Query: {
        getAllUser: async () => UserServices.getAllUsers(),
        getUserById: async (
            _: null, 
            args: { id: number }
        ) => UserServices.getUserById(args.id),
    },
    Mutation: {
        createUser: async (
            _: null,
            args: CreateUser,
        ) => UserServices.createUser(args),
        updateUser: async (
            _: null,
            args: UpdateUser,
        ) => UserServices.updateUser(args),
        deleteUser: async (
            _: null,
            args: { id: number }
        ) => UserServices.deleteUser(args.id),
    }
}

export default userResolvers;