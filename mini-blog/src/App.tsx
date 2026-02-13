import { BrowserRouter, Routes, Route } from "react-router-dom"
import PostList from "./pages/PostList"
import PostDetail from "./pages/PostDetail"
import PostEdit from "./pages/PostEdit"
import { PostProvider } from "./context/PostContext"

function App() {
  return (
    <PostProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
        </Routes>
      </BrowserRouter>
    </PostProvider>
  )
}

export default App