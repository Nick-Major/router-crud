import { useState } from "react";
import fetchData from "../utils/fetchData";

const ViewPost = ({id}) => {
    const [showEditForm, setShowEditForm] = useState(true);

    const handlePostEdit = () => {
        // При клике на кнопку «Редактировать» карточка просмотра заменяется карточкой редактирования:
    }

    const deletePost = (postId) => {
        // При клике на кнопку «Удалить» происходит удаление поста, 
        // // после чего осуществляется редирект на главную страницу. DELETE на адрес http://localhost:7070/posts/{id}.
        fetchData(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE'
        });
        setShowEditForm(false);

    }

    return (
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
            <div className="change-and-delete">
                <button className="change-btn" onClick={handlePostEdit}>Изменить</button>
                <button className="delete-btn" onClick={deletePost}>Удалить</button>
            </div>
        </div>
    )
}