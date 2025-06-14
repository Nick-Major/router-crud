import { useState } from 'react';

const CreatePostForm = ({ onCancel }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Создан пост:', postText);
    // Здесь будет логика отправки данных
    setPostText('');
    onCancel();
  };

  return (
    <div className="post-form">
      <h3>Создать новый пост</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Что у вас нового?"
          required
        />
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Опубликовать
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onCancel}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;