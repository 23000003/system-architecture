import { useEffect, useState } from "react"
import { PostServices } from "./services/post.services"

export default function App() {

  const [postData, setData] = useState<any>();

  useEffect(() => {
    const fetchPosts = async () =>{
      const data = PostServices.getPosts()
      console.log(data, "RETURN HERE")
    }
    fetchPosts();
  }, [])


  return (
    <div className="bg-red-500">
      <h2 className="text-gray-500">WASDWADWASUP</h2>
    </div>
  )
}