import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PostsProvider } from "./context/PostsContext";
import FeedPosts from "./components/FeedPosts";
import ListPosts from "./components/ListPosts";
import CreatePostForm from "./components/CreatePostForm";
import ViewPost from "./components/ViewPost";
import PostEditMode from "./components/PostEditMode";
import "./App.css";

function App() {
  return (
    <PostsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FeedPosts />}>
            <Route index element={<ListPosts />} />
          </Route>
          <Route path="/posts/new" element={<CreatePostForm />} />
          <Route path="/posts/:id" element={<ViewPost />} />
          <Route path="/posts/:id/edit" element={<PostEditMode />} />
        </Routes>
      </Router>
    </PostsProvider>
  );
}

export default App;

