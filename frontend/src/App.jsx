import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.component";
import LoginPage from "./pages/login.page";
import SignupPage from "./pages/signup.page";
import UserContextProvider from "./context/UserContext";
import EditorPage from "./pages/editor.pages";
import { Toaster } from "sonner";
import EditorContextProvider from "./context/EditorContext";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import NotFoundPage from "./pages/404.page";
import UserProfilePage from "./pages/profile.page";
import DetailedBlogPage from "./pages/blog.page";
import BlogContextProvider from "./context/BlogContext";

const App = () => {
  return (
    <BlogContextProvider>
      <UserContextProvider>
        <EditorContextProvider>
          <Routes>
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/" element={<NavBar />}>
              <Route index element={<HomePage />} />
              <Route path="/search/:query" element={<SearchPage />} />
              <Route path="/sign-in" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/user/:id" element={<UserProfilePage />} />
              <Route path="/blog/:blogId" element={<DetailedBlogPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <Toaster richColors position="top-center" />
        </EditorContextProvider>
      </UserContextProvider>
    </BlogContextProvider>
  );
};

export default App;
