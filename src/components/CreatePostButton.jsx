import { useState } from 'react';
import CreatePostForm from './CreatePostForm';

const CreatePostButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="post-container">
      {showForm ? (
        <CreatePostForm onCancel={handleCancel} />
      ) : (
        <button 
          className="create-post-btn" 
          onClick={handleButtonClick}
        >
          Создать пост
        </button>
      )}
    </div>
  );
};

export default CreatePostButton;