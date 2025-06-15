import likeImg from '../assets/like.png';
import commentImg from '../assets/comment.png';

const PostCard = ({ post, onClick }) => {
  return (
    <div className="post" key={post.id} onClick={onClick}>
      <img src={post.avatarUrl} alt="Аватар пользователя" />
      <div className="user-info">
        <span className="user-name">{post.author || "Аноним"}</span>
        <span className="created">{new Date(post.created).toLocaleString()}</span>
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
  );
};

export default PostCard;