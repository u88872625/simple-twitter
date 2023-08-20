import "./styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminUserPage from "./pages/AdminUsersPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import SignUpPage from "./pages/SignUpPage";
import StatusPage from "./pages/StatusPage";
import UserPage from "./pages/UserPage";

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
