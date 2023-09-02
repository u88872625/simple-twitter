import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./StatusPage.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useTweetId } from "../../contexts/TweetIdContext";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout.jsx";
import TopTweet from "../../components/TopTweet/TopTweet.jsx";
import ReplyCollection from "./ReplyCollection.jsx";
import arrow from "../../assets/icons/back.svg";
import { getTopTweetReplies } from "../../api/tweets";

const StatusPage = () => {
  // // 從路由路徑取得貼文id
  // const { id } = useParams();
  const token = localStorage.getItem("token");
  const { currentUser, isReplyUpdated, setIsReplyUpdated, replyTweet } =
    useAuth();
  const role = currentUser?.role;
  const { tweetId, tweetData, repliesData } = useTweetId(); //取得存在context的最新id
  // const tweetData = JSON.parse(localStorage.getItem("tweetData"));
  // const repliesData = JSON.parse(localStorage.getItem("repliesData"));
  const [topTweet, setTopTweet] = useState(tweetData);
  const [topTweetReplies, setTopTweetReplies] = useState(repliesData);
  // 重新渲染
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 追蹤要返回的上一頁
  const handleBack = () => {
    const prevLocation = "/home";
    navigate(prevLocation);
  };

  useEffect(() => {
    setTopTweet(tweetData);
    setTopTweetReplies(repliesData);
  }, [tweetData, repliesData]);

  // 送出回覆後，回傳一個已更新過的所有回覆陣列
  useEffect(() => {
    const fetchNewReplies = async () => {
      const newReplies = await getTopTweetReplies(tweetId);
      setTopTweetReplies(newReplies);
    };

    if (isReplyUpdated) {
      fetchNewReplies();
      setIsReplyUpdated(false);
    }
  }, [isReplyUpdated, setIsReplyUpdated, tweetId, setTopTweetReplies]);

  //  驗證token是否存在
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <FontendLayout>
      <div className={styles.header}>
        <img
          className={styles.arrow}
          src={arrow}
          alt="arrow"
          onClick={handleBack}
        />
        <h4 className={styles.title}>推文</h4>
      </div>
      <div>
        <TopTweet tweet={topTweet} />
      </div>
      <div>
        <ReplyCollection replies={topTweetReplies} />
      </div>
    </FontendLayout>
  );
};

export default StatusPage;
