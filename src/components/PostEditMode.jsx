import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import fetchData from "../utils/fetchData";

const PostEditMode = () => {
  const { id } = useParams();
  const { 
    posts, 
    updatePost,
    fetchPosts,
    isLoading: contextLoading,
    error: contextError
  } = usePosts();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postFromContext = posts.find(p => p.id.toString() === id.toString());
        if (postFromContext) {
          setContent(postFromContext.content || "");
          return;
        }

        const result = await fetchData(`http://localhost:3000/posts/${id}`);
        setContent(result.content || "");
      } catch (err) {
        setLocalError("Не удалось загрузить пост для редактирования");
        navigate("/");
      }
    };

    loadPost();
  }, [id, posts, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setLocalError("Текст поста не может быть пустым");
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);

    try {
      await updatePost(id, { content });
      await fetchPosts();
      navigate("/");
    } catch (err) {
      setLocalError(err.message || "Ошибка при сохранении изменений");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = contextLoading || isSubmitting;
  const error = localError || contextError;

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="post-edit">
      <div className="edit-header">
        <h2 className="edit-post-title">Редактирование поста</h2>
        <button 
          className="close-btn"
          onClick={() => navigate(`/posts/${id}`)}
          disabled={isLoading}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="edit-textarea"
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            setLocalError(null)
          }}
          placeholder="Введите текст поста"
          required
          autoFocus
        />
        
        {localError && <div className="error-message">{localError}</div>}
        
        <div className="edit-controls">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/posts/${id}`)}
            disabled={isLoading}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="save-btn"
            disabled={isLoading || !content.trim()}
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </form>
    </div>
  )
};

export default PostEditMode;
