import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePosts } from "../context/PostsContext"
import fetchData from "../utils/fetchData"

const CreatePostForm = () => {
  const [postText, setPostText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { fetchPosts } = usePosts()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!postText.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetchData("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: postText,
        }),
      })
      console.log("Response from server:", response)

      if (response.error) {
        throw new Error(response.error)
      }

      await fetchPosts();
      navigate("/", {replace: true})
    } catch (err) {
      console.error("Error:", err)
      setError(err.message || "Ошибка при создании поста")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-post-form">
      <div className="form-header">
        <h3 className="create-post-title">Создать новый пост</h3>
        <button
          className="close-btn"
          onClick={() => navigate("/")}
          disabled={isSubmitting}
        >
          ×
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <textarea
          className="new-post-textarea"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Что у вас нового?"
          required
          autoFocus
          disabled={isSubmitting}
        />
        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || !postText.trim()}
          >
            {isSubmitting ? "Публикация..." : "Опубликовать"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePostForm;
