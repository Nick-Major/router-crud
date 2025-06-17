import likeImg from "../assets/like.png"
import commentImg from "../assets/comment.png"

const PostCard = ({ post, onClick }) => {
  return (
    <div className="post" key={post.id} onClick={onClick}>
      <div className="user-info-container">
        <div className="user-img">
          {post.avatarUrl ? (
            <img src={post.avatarUrl} alt={post.author || "Аноним"} />
          ) : (
            <span className="alt-text">{post.author?.charAt(0) || "Аноним"}</span>
          )}
        </div>
        <div className="user-info">
          <span className="user-name">{post.author || "Аноним"}</span>
          <span className="created">
            {new Date(post.created).toLocaleString()}
          </span>
        </div>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button className="action-btn">
          <img className="like-img" src={likeImg} alt="Лайк" />
          <span>Нравится</span>
        </button>
        <button className="action-btn">
          <img className="comment-img" src={commentImg} alt="Комментарий" />
          <span>Комментировать</span>
        </button>
      </div>
    </div>
  )
}

export default PostCard;