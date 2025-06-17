import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { usePosts } from "../context/PostsContext"
import likeImg from "../assets/like.png"
import commentImg from "../assets/comment.png"
import fetchData from "../utils/fetchData"

const ViewPost = () => {
  const { id } = useParams()
  const {
    posts,
    deletePost,
    fetchPosts,
    isLoading: contextLoading,
    error: contextError,
  } = usePosts()
  const [isDeleting, setIsDeleting] = useState(false)
  const [localError, setLocalError] = useState(null)
  const [post, setPost] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadPost = async () => {
      setIsFetching(true)
      try {
        const postFromContext = posts.find((p) => p.id.toString() === id.toString())
        
        if (postFromContext) {
          setPost({
            ...postFromContext,
            content: postFromContext.content || ""
          })
          return
        }

        const result = await fetchData(`http://localhost:3000/posts/${id}`)
        setPost({
          ...result,
          content: result.content || ""
        })
      } catch (err) {
        setLocalError(err.message || "Не удалось загрузить пост")
        navigate("/", { replace: true })
      } finally {
        setIsFetching(false)
      }
    }

    loadPost()
    
    return () => {
      setIsFetching(false)
    }
  }, [id, posts, navigate])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deletePost(id);
      await fetchPosts();
      navigate("/", { replace: true })
    } catch (err) {
      setLocalError(err.message || "Ошибка при удалении поста")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`)
  }

  const isLoading = contextLoading || isDeleting || isFetching
  const error = localError || contextError

  if (isLoading && !post) {
    return <div className="loading">Загрузка поста...</div>
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>
  }

  if (!post) {
    return <div className="empty">Пост не найден</div>
  }

  return (
    <div className="post-view">
      <button className="close-btn" onClick={() => navigate("/")}>
        ×
      </button>

      <div className="post-content">
        <div className="user-info-container">
          <div className="user-img">
            {post.avatarUrl ? (
              <img src={post.avatarUrl} alt={post.author || "Аноним"} />
            ) : (
              <span className="alt-text">
                {post.author?.charAt(0) || "А"}
              </span>
            )}
          </div>
          <div className="user-info">
            <span className="user-name">{post.author || "Аноним"}</span>
            <span className="created">
              {new Date(post.created).toLocaleString()}
            </span>
          </div>
        </div>
        <p className="post-text">{post.content || "Нет содержимого"}</p>

        <div className="post-actions">
          <button className="action-btn">
            <img className="like-img" src={likeImg} alt="Лайк" />
            <span>Нравится</span>
          </button>
          <button className="action-btn">
            <img className="comment-img" src={commentImg} alt="Комментарий" />
            <span>Комментировать</span>
          </button>
        </div>

        <div className="post-controls">
          <button
            className="edit-btn"
            onClick={handleEdit}
            disabled={isLoading}
          >
            Редактировать
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isDeleting ? "Удаление..." : "Удалить"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewPost;
