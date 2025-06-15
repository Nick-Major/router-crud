import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const PostEditMode = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
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
                    setContent(result.post.content);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        
        try {
            const result = await fetchData(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            });
            
            if (result.error) {
                throw new Error(result.error);
            }

            navigate(`/posts/${id}`);
            
        } catch (err) {
            setError(err.message || 'Ошибка при сохранении');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="loading">Загрузка поста...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="post-edit">
            <div className="edit-header">
                <h2>Редактировать публикацию</h2>
                <button 
                    className="close-btn" 
                    onClick={() => navigate(`/posts/${id}`)}
                    disabled={isSaving}
                >
                    ×
                </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="edit-content">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isSaving}
                />
            </div>
            
            <div className="edit-actions">
                <button 
                    className="save-btn" 
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Сохранение...' : 'Сохранить'}
                </button>
            </div>
        </div>
    );
};

export default PostEditMode;