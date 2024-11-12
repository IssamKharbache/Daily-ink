import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.component";
import LoginPage from "./pages/login.page";
import SignupPage from "./pages/signup.page";
import UserContextProvider from "./context/UserContext";
import EditorPage from "./pages/editor.pages";
import { Toaster } from "sonner";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/" element={<NavBar />}>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </UserContextProvider>
  );
};

export default App;
