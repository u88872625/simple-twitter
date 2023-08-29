import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SignUpPage,
  LoginPage,
  MainPage,
  UserPage,
  SettingPage,
  StatusPage,
  UserFollowPage,
  HomePage,
  AdminLoginPage,
  AdminMainPage,
  AdminUsersPage,
} from "./pages/index";
import TweetTabs from "./components/TweetTabs/TweetTabs.jsx";
import AddTweet from "./components/AddTweet/AddTweet";

import "./styles/App.module.scss";
import { AuthProvider } from "./contexts/AuthContext";

import FontendSettingLayout from "./components/shared/layout/FontendSettingLayout/FontendSettingLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/:id" element={<UserPage />} />
            <Route path="/settings" element={<SettingPage />} />
            {/* <Route path="/settings/profile" element={<Modal />} />  */}
            <Route path="/:username/replies" element={<TweetTabs />} />
            <Route path="/:username/likes" element={<TweetTabs />} />
            <Route path="/:username/followers" element={<UserFollowPage />} />
            <Route path="/:username/followering" element={<UserFollowPage />} />
            <Route path="/compose" element={<AddTweet />} />
            {/* <Route path="/compose" element={<Modal />} /> */}
            <Route path="/:username/status/:id" element={<StatusPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/main" element={<AdminMainPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
