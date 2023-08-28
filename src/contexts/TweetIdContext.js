import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopTweet, getTopTweetReplies } from "../api/tweets";

const TweetIdContext = createContext();

export const useTweetId = () => useContext(TweetIdContext);

export function TweetIdContextProvider({ children }) {
  const [tweetId, setTweetId] = useState(null);
  const [tweetData, setTweetData] = useState(null);
  const [repliesData, setRepliesData] = useState(null);

  const navigate = useNavigate();

  const handleTweetClick = async (id) => {
    try {
      const tweetRes = await getTopTweet(id);
      const repliesRes = await getTopTweetReplies(id);

      setTweetId(id);
      setTweetData(tweetRes);
      setRepliesData(repliesRes);
      navigate(`/status/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TweetIdContext.Provider
      value={{ tweetId, setTweetId, handleTweetClick, tweetData, repliesData }}
    >
      {children}
    </TweetIdContext.Provider>
  );
}
