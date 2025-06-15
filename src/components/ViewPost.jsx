import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import likeImg from '../assets/like.png';
import commentImg from '../assets/comment.png';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                const result = await fetchData(`http://localhost:3000/posts/${id}`);
                
                if (result.error) {
                    setError(result.error);
                } else {
                    setPost(result.post);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await fetchData(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE'
            });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Ошибка при удалении поста');
        }
    };

    if (isLoading) {
        return <div className="loading">Загрузка поста...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    if (!post) {
        return <div className="empty">Пост не найден</div>;
    }

    return (
        <div className="post-view">
            <button className="close-btn" onClick={() => navigate('/')}>×</button>
            
            <div className="post-content">
                <img src={post.avatarUrl} alt="Аватар пользователя" />
                <div className="user-info">
                    <span className="user-name">{post.author || "Аноним"}</span>
                    <span className="created">{new Date(post.created).toLocaleString()}</span>
                </div>
                <p className="post-text">{post.content}</p>
                
                <div className="post-actions">
                    <button className="action-btn">
                        <img src={likeImg} alt="Лайк" />
                        <span>Нравится</span>
                    </button>
                    <button className="action-btn">
                        <img src={commentImg} alt="Комментарий" />
                        <span>Комментировать</span>
                    </button>
                </div>
                
                <div className="post-controls">
                    <button 
                        className="edit-btn" 
                        onClick={() => navigate(`/posts/${id}/edit`)}
                    >
                        Редактировать
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewPost;