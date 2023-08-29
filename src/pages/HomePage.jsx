import React, { useState, useEffect } from "react";
import FontendLayout from "../components/shared/layout/FontendLayout/FontendLayout";
import AddTweet from "../components/AddTweet/AddTweet";
import TweetContent from "../components/TweetTabs/TweetContent/TweetContent";
import { useTweetId } from "../contexts/TweetIdContext";
import { getAllTweets } from "../api/tweets";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate,useLocation ,useParams } from "react-router-dom";

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  // const{account} = useParams()
  const { handleTweetClick } = useTweetId(); //更新貼文id
  const location = useLocation();

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
        <AddTweet avatar={currentUser?.avatar} />
        <TweetContent tweets={tweets} onTweetClick={(id)=>handleTweetClick(id,location)} />
      </FontendLayout>
    </div>
  );
};

export default HomePage;
