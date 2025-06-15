import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import PostCard from './PostCard';
import CreatePostButton from './CreatePostButton';

const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const API_URL = 'http://localhost:3000/posts';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const result = await fetchData(API_URL);
                
                if (result.error) {
                    setError(result.error);
                } else {
                    // Сортируем посты по дате (новые сначала)
                    const sortedPosts = result.sort((a, b) => 
                        new Date(b.created) - new Date(a.created)
                    );
                    setPosts(sortedPosts || []);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Функция для добавления нового поста в начало списка
    const handleNewPost = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    if (isLoading) {
        return <div className="loading">Загрузка постов...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <>
            {/* Передаем handleNewPost в CreatePostButton */}
            <CreatePostButton onPostCreated={handleNewPost} />
            
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
    );
};

export default ListPosts;