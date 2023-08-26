import React, { useState, useEffect } from "react";
import FontendLayout from "../components/shared/layout/FontendLayout/FontendLayout";
import AddTweet from "../components/AddTweet/AddTweet";
import TweetContent from "../components/TweetTabs/TweetContent/TweetContent";

import { getAllTweets } from "../api/tweets";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getAllTweets();
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      getTweetsAsync();
    } else {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);


  return (
    <div>
      <FontendLayout>
        <AddTweet />
        <TweetContent tweets={tweets} />
      </FontendLayout>
    </div>
  );
};

export default HomePage;
