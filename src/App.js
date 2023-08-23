import { BrowserRouter, Routes, Route } from "react-router-dom";
import {SignUpPage,LoginPage,HomePage,UserPage,SettingPage,StatusPage,AdminLoginPage,AdminMainPage,AdminUsersPage} from './pages/index'
import TweetTabs from "./components/TweetTabs";
import FollowTabs from "./components/FollowTabs";
import AddTweet from "./components/AddTweet"; 
import "./styles/App.scss";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/settings" element={<SettingPage />} />
          {/* <Route path="/settings/profile" element={<Modal />} />  */}
          <Route path="/:username/replies" element={<TweetTabs />} />
          <Route path="/:username/likes" element={<TweetTabs />} />
          <Route path="/:username/followers" element={<FollowTabs />} />
          <Route path="/:username/followering" element={<FollowTabs />} />
          <Route path="/compose" element={<AddTweet />} />
          <Route path="/:username/status/:id" element={<StatusPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/main" element={<AdminMainPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
