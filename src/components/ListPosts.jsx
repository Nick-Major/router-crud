import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../context/PostsContext'
import PostCard from './PostCard'
import CreatePostButton from './CreatePostButton'

const ListPosts = () => {
  const { 
    posts, 
    isLoading, 
    error,
    fetchPosts 
  } = usePosts()
  const navigate = useNavigate()

  useEffect(() => {
    if (posts.length === 0 && !isLoading) {
      fetchPosts()
    }
  }, [posts.length, isLoading, fetchPosts])

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`)
  }

  if (isLoading) {
    return <div className="loading">Загрузка постов...</div>
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>
  }

  return (
    <>
      <CreatePostButton />
      <div className="posts-list">
        {posts.length ? (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={() => handlePostClick(post.id)}
            />
          ))
        ) : (
          <div className="empty">Постов пока нет</div>
        )}
      </div>
    </>
  )
}

export default ListPosts;