import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";
import likeImg from '../assets/like.png';
import commentImg from '../assets/comment.png';

const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:3000/posts';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const result = await fetchData(API_URL);
                
                if (result.error) {
                    setError(result.error);
                } else {
                    setPosts(result || []);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div className="loading">Загрузка постов...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    if (!posts.length) {
        return <div className="empty">Постов пока нет</div>;
    }

    return (
        <div className="posts-list">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src={post.avatarUrl} alt="Аватар пользователя" />
                    <div className="user-info">
                        <span className="user-name">{post.author || "Аноним"}</span>
                        <span className="created">{new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="post-content">{post.content}</p>
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
                </div>
            ))}
        </div>
    );
};

export default ListPosts;