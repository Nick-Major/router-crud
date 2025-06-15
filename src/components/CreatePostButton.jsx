import { useNavigate } from 'react-router-dom';

const CreatePostButton = ({ onPostCreated }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/posts/new', {
            state: { onPostCreated } // Передаем callback через роутер
        });
    };

    return (
        <button 
            className="create-post-btn" 
            onClick={handleClick}
        >
            Создать пост
        </button>
    );
};

export default CreatePostButton;