import { createContext, useContext, useState } from "react"
import fetchData from "../utils/fetchData"

const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const result = await fetchData("http://localhost:3000/posts")
      const sortedPosts = result.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      )
      setPosts(sortedPosts)
      return sortedPosts
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const deletePost = async (id) => {
    setIsLoading(true)
    try {
      await fetchData(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      })
      setPosts((prev) => prev.filter((post) => post.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const addPost = (newPost) => {
    setPosts(prev => [newPost, ...prev])
  }

  const updatePost = async (id, updatedData) => {
    setIsLoading(true)
    try {
      const result = await fetchData(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, ...updatedData } : post
        )
      )

      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        updatePost,
        fetchPosts,
        deletePost,
        addPost,
        isLoading,
        error,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext);
