import { gql, useQuery } from '@apollo/client';
import { Post } from '../types/types';

const postQuery = gql`
    query GetAllPost {
        getAllPost {
            id
            authorId
            title
            content
            date_posted
        }
    }
`;

export const usePostData = () => {
    const { loading, error, data } = useQuery<{ getAllPost: Post[] }>(postQuery);
    return { loading, error, data };
}