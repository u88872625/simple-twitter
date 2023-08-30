import React, { useState, useEffect } from "react";
import FontendLayout from "../components/shared/layout/FontendLayout/FontendLayout";
import AddTweet from "../components/AddTweet/AddTweet";
import TweetContent from "../components/TweetTabs/TweetContent/TweetContent";
import { getUserInfo } from "../api/user";
import { getAllTweets } from "../api/tweets";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = currentUser?.id;
  const role = currentUser?.role;

  useEffect(() => {
    if (userId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          console.log("User Info:", userInfo);
          setUserInfo(userInfo);
        } catch (error) {
          console.error(error);
        }
      };
      getUserInfoAsync();
    }
  }, [userId]);

  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getAllTweets();
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

  useEffect(() => {
    if (!token && role === "admin") {
      navigate("/login");
    }
  }, [navigate, token, role]);

  return (
    <div>
      <FontendLayout>
        <AddTweet avatar={userInfo.avatar} />
        <TweetContent tweets={tweets} />
      </FontendLayout>
    </div>
  );
};

export default HomePage;
