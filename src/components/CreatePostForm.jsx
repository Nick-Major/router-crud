import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import fetchData from "../utils/fetchData"

const CreatePostForm = () => {
  const [postText, setPostText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const onPostCreated = location.state?.onPostCreated

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
          id: 0,
          content: postText,
        }),
      })

      if (response.error) {
        throw new Error(response.error)
      }

      if (onPostCreated) {
        onPostCreated(response)
      }

      navigate("/")
    } catch (err) {
      setError(err.message || "Ошибка при создании поста")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-post-form">
      <div className="form-header">
        <h3>Создать новый пост</h3>
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

export default CreatePostForm
