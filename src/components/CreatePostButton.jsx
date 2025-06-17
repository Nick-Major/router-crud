import { useNavigate } from 'react-router-dom';

const CreatePostButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/posts/new');
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
