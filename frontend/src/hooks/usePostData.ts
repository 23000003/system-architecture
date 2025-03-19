import { gql, useQuery } from '@apollo/client';

export const usePostData = () => {
    
    const postQuery = gql`
        query GetAllPost {
            getAllPost {
                id
                content
            }
        }
    `;

    const { loading, error, data } = useQuery(postQuery);

    return { loading, error, data };
}