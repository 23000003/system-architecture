import { useSubscription, gql } from '@apollo/client';
import { Post } from '../types/types';

const postSubscription = gql`
  subscription PostAdded {
    postAdded {
      id
      authorId
      title
      content
      date_posted
    }
  }
`;

export const usePostSubscription = () => {
    const { data, error } = useSubscription<{ postAdded: Post }>(postSubscription);
    return { data, error };
}