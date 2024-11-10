import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.component";
import LoginPage from "./pages/login.page";
import SignupPage from "./pages/signup.page";
import UserContextProvider from "./context/UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
