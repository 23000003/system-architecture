import { useEffect, useState } from "react"
import { usePostData } from "./hooks/usePostData";
import { usePostSubscription } from "./hooks/usePostSubscription";
import { Post, User } from "./types/types";
import { useUserData } from "./hooks/useUserData";
// import lebron from './assets/2544.avif';

export default function App() {

  const [posts, setPosts] = useState<Post[]>([]);

  const { data, error } = usePostSubscription();
  const { data: postData, loading: postLoading, error: postError } = usePostData();
  const { data: userData, loading: userLoading, error: userError} = useUserData();

  useEffect(() => {
    if (data && data.postAdded) {
      setPosts((prevPosts: Post[]) => {
        return [...prevPosts, data.postAdded] as Post[];
      });
    } else {
      setPosts(postData?.getAllPost as Post[]);
    }
  }, [data, postData]);
  

  if (error || postError || userError) {
    return <div>Error: {error?.message || postError?.message || userError?.message}</div>
  }

  if (postLoading || userLoading) {
    return <div>Loading...</div>
  }

  const sortDataTableBy = (key: 'id' | 'authorId' | 'date') => {
    const sortedPosts = [...posts].sort((a: Post, b: Post) => {
      if (key === 'id') {
        return a.id - b.id;
      } else if(key === 'authorId') {
        return a.authorId - b.authorId;
      } else {
        return Number(b.date_posted) - Number(a.date_posted);
      }
    });
    setPosts(sortedPosts);
  }

  const findAuthor = (id: number) => {
    const author = userData?.getAllUser.find((user: User) => user.id === id);
    return (
      <td className="px-6 py-3 border-b text-sm text-gray-700">{author ? author.username : "Unknown"}</td>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <select 
          className="mb-4 p-2 border rounded-md"
          onChange={(e) => {
              if (e.target.value === 'id' || e.target.value === 'authorId' || e.target.value === 'date') {
                sortDataTableBy(e.target.value);
              }
            }}
          >
          <option value="id">Sort by Post ID</option>
          <option value="authorId">Sort by Author ID</option>
          <option value="date">Sort by Latest Post</option>
        </select>
      </div>
      <table className="min-w-full bg-black border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-6 py-3 text-left text-sm font-medium">Post ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Content</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Author ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Posted By</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Date Posted</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts?.map((post: Post) => (
              <tr key={post.id} className="hover:bg-gray-50 odd:bg-gray-50 even:bg-gray-100 transition-all">
                <td className="px-6 py-3 border-b text-sm text-gray-700">{post.id}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-700">{post.title}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-700">{post.content}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-700">{post.authorId}</td>
                {findAuthor(post.authorId)}
                <td className="px-6 py-3 border-b text-sm text-gray-700">{new Date(Number(post.date_posted)).toLocaleString()}</td>
              </tr>
            ))) : (
            <tr>
              <td className="px-6 py-3 border-b text-sm text-gray-700" colSpan={6}>No Data!!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}