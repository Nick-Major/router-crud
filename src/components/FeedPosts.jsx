import ListPosts from "./ListPosts";

const FeedPosts = ({ children }) => {
  return (
    <div className="posts-container">
      {children || <ListPosts />}
    </div>
  )
}

export default FeedPosts;