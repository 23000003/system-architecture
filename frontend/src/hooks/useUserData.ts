import { gql, useQuery } from '@apollo/client';
import { User } from '../types/types';

export const userQuery = gql`
    query GetAllUser {
        getAllUser {
            username
            id
        }
    }
`;

export const useUserData = () => {
    const { loading, error, data } = useQuery<{ getAllUser: User[] }>(userQuery);
    
    return { loading, error, data };
}