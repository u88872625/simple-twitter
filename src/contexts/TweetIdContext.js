import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTopTweet, getTopTweetReplies } from "../api/tweets";
import { useDataUpdate } from "./UserDataContext";

const TweetIdContext = createContext();

export const useTweetId = () => useContext(TweetIdContext);

export function TweetIdContextProvider({ children }) {
  const [tweetId, setTweetId] = useState(null);
  const [tweetData, setTweetData] = useState(null);
  const [repliesData, setRepliesData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // const { isDataUpdate, setIsDataUpdate } = useDataUpdate();

  // useEffect(() => {
  //   if (tweetId) {
  //     const fetchData = async () => {
  //       try {
  //         const tweetRes = await getTopTweet(tweetId);
  //         const repliesRes = await getTopTweetReplies(tweetId);
  //         console.log("tweetidcontext:", tweetRes);
  //         setTweetData(tweetRes);
  //         setRepliesData(repliesRes);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [tweetId]);

  // 參數為被點擊的貼文id和點擊時的頁面

  // const handleTweetClick = async (id, location) => {
  //   try {
  //     const tweetRes = await getTopTweet(id);
  //     const repliesRes = await getTopTweetReplies(id);

  //     setTweetId(id);
  //     setTweetData(tweetRes);
  //     setRepliesData(repliesRes);
  //     navigate(`/status/${id}`, { state: { from: location.pathname } });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleTweetClick = async (id, location) => {
    try {
      const tweetRes = await getTopTweet(id);
      const repliesRes = await getTopTweetReplies(id);

      localStorage.setItem("tweetData", JSON.stringify(tweetRes));
      localStorage.setItem("repliesData", JSON.stringify(repliesRes));

      setTweetId(id);
      navigate(`/status/${id}`, { state: { from: location.pathname } });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const id = location.pathname.split("/status/")[1]; // 取得URL中的tweetId
    if (id) {
      const fetchData = async () => {
        try {
          const tweetRes = await getTopTweet(id);
          const repliesRes = await getTopTweetReplies(id);

          localStorage.setItem("tweetId", id);
          localStorage.setItem("tweetData", JSON.stringify(tweetRes));
          localStorage.setItem("repliesData", JSON.stringify(repliesRes));
          const storedTweetData = localStorage.getItem("tweetData");
          const storedRepliesData = localStorage.getItem("repliesData");
          if (storedTweetData) setTweetData(JSON.parse(storedTweetData));
          if (storedRepliesData) setRepliesData(JSON.parse(storedRepliesData));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [location]);

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
