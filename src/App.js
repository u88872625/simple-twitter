import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
  UserOtherPage,
  UserOtherFollowPage,
} from "./pages/index";
import TweetTabs from "./components/TweetTabs/TweetTabs.jsx";
import AddTweet from "./components/AddTweet/AddTweet";

import "./styles/App.module.scss";
import { AuthProvider } from "./contexts/AuthContext";

import { TweetIdContextProvider } from "./contexts/TweetIdContext";
import { UserDataContextProvider } from "./contexts/UserDataContext";
// import { LikeContexProvider } from "./contexts/LikeContext";

function App() {
  const basename = process.env.PUBLIC_URL;
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <UserDataContextProvider>
            <TweetIdContextProvider>
              {/* <LikeContexProvider> */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/:account" element={<UserPage />} />
                <Route path="/other/:account" element={<UserOtherPage />} />
                <Route path="/settings" element={<SettingPage />} />
                {/* <Route path="/settings/profile" element={<Modal />} />  */}
                <Route path="/:account/replies" element={<TweetTabs />} />
                <Route path="/:account/likes" element={<TweetTabs />} />
                <Route path="/:account/follower" element={<UserFollowPage />} />
                <Route
                  path="/other/:account/follower"
                  element={<UserOtherFollowPage />}
                />
                <Route path="/compose" element={<AddTweet />} />
                {/* <Route path="/compose" element={<Modal />} /> */}
                <Route path="/status/:id" element={<StatusPage />} />
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/main" element={<AdminMainPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
              {/* </LikeContexProvider> */}
            </TweetIdContextProvider>
          </UserDataContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
