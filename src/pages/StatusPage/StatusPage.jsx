import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./StatusPage.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useTweetId } from "../../contexts/TweetIdContext";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout.jsx";
import TopTweet from "../../components/TopTweet/TopTweet.jsx";
import ReplyCollection from "./ReplyCollection.jsx";
import arrow from "../../assets/icons/back.svg";

const StatusPage = () => {
  // // 從路由路徑取得貼文id
  // const { id } = useParams();
  const { tweetId, tweetData, repliesData } = useTweetId(); //取得存在context的最新id
  const [topTweet, setTopTweet] = useState(tweetData);
  const [topTweetReplies, setTopTweetReplies] = useState(repliesData);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  console.log("status:", tweetId);
  console.log("statustweetdata:", tweetData);

  useEffect(() => {
    setTopTweet(tweetData);
    setTopTweetReplies(repliesData);
  }, [tweetData, repliesData]);

  //  驗證token是否存在
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <FontendLayout>
      <div className={styles.header}>
        <img className={styles.arrow} src={arrow} alt="arrow" />
        <h5 className={styles.title}>推文</h5>
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
