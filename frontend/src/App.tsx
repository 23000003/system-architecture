import { useEffect, useState } from "react"
import { useSubscription, gql } from '@apollo/client';
import { usePostData } from "./hooks/usePostData";

// const postSubscription = gql`
//   subscription PostAdded {
//     postAdded {
//       authorId
//     }
//   }
// `;

export default function App() {

  const [posts, setPosts] = useState<any[]>([]);

  // const { data, loading, error } = useSubscription(postSubscription);
  // const { data: postData, loading: postLoading, error: postError } = usePostData();

  // console.log(data, loading, error);
  // console.log(postData, postLoading, postError);
  
  // useEffect(() => {
  //   if (data && data.postAdded) {
  //     setPosts((prevPosts) => [...prevPosts, data.postAdded]);
  //     console.log(data.postAdded);
  //   }
  // }, [data]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  console.log(posts);

  return (
    <div className="bg-red-500">
      <h2 className="text-gray-500">WASDWADWASUP</h2>
    </div>
  )
}