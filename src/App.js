import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  SignUpPage,
  LoginPage,
  HomePage,
  UserPage,
  SettingPage,
  StatusPage,
  AdminLoginPage,
  AdminMainPage,
  AdminUsersPage,
} from "./pages/index";
import TweetTabs from "./components/TweetTabs/TweetTabs.jsx";
import AddTweet from "./components/AddTweet/AddTweet";
import FollowTabs from "./components/FollowTabs/FollowTabs";
import "./styles/App.module.scss";
import { AuthProvider } from "./contexts/AuthContext";
import {TweetIdContextProvider} from './contexts/TweetIdContext'



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <TweetIdContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/:account" element={<UserPage />} />
            <Route path="/settings" element={<SettingPage />} />
            {/* <Route path="/settings/profile" element={<Modal />} />  */}
            <Route path="/:username/replies" element={<TweetTabs />} />
            <Route path="/:username/likes" element={<TweetTabs />} />
            <Route path="/:username/followers" element={<FollowTabs />} />
            <Route path="/:username/followering" element={<FollowTabs />} />
            <Route path="/compose" element={<AddTweet />} />
            {/* <Route path="/compose" element={<Modal />} /> */}
            <Route path="/status/:id" element={<StatusPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/main" element={<AdminMainPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Routes>
          </TweetIdContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
