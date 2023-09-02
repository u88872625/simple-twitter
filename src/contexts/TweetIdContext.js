import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTopTweet, getTopTweetReplies } from "../api/tweets";

const TweetIdContext = createContext();

export const useTweetId = () => useContext(TweetIdContext);

export function TweetIdContextProvider({ children }) {
  const [tweetId, setTweetId] = useState(null);
  const [tweetData, setTweetData] = useState(null);
  const [repliesData, setRepliesData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  // 參數為被點擊的貼文id和點擊時的頁面
  const handleTweetClick = async (id, location) => {
    try {
      const tweetRes = await getTopTweet(id);
      const repliesRes = await getTopTweetReplies(id);

      setTweetId(id);
      setTweetData(tweetRes);
      setRepliesData(repliesRes);
      navigate(`/status/${id}`, { state: { from: location.pathname } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TweetIdContext.Provider
      value={{
        tweetId,
        setTweetId,
        handleTweetClick,
        tweetData,
        repliesData,
      }}
    >
      {children}
    </TweetIdContext.Provider>
  );
}
