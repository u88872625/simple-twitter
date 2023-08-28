import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./StatusPage.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import{getTopTweet,getTopTweetReplies} from '../../api/tweets'
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout.jsx";
import TopTweet from "../../components/TopTweet/TopTweet.jsx";
import ReplyCollection from "./ReplyCollection.jsx";
import arrow from "../../assets/icons/back.svg";

const StatusPage = () => {
  // 從路由路徑取得貼文id
  const { id } = useParams();
  const [topTweet, setTopTweet] = useState(null);
  const [topTweetReplies, setTopTweetReplies] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 取得貼文和所有回覆
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const getTopTweetAsync = async () => {
        try {
          const res = await getTopTweet(id);
          console.log(res);
          setTopTweet(res);
        } catch (error) {
          console.error(error);
        }
      };
      const getTopTweetRepliesAsync = async () => {
        try {
          const res = await getTopTweetReplies(id);
          console.log(res);
          setTopTweetReplies(res);
        } catch (error) {
          console.error(error);
        }
      };
      getTopTweetAsync();
      getTopTweetRepliesAsync();
    }
  }, [id]);

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
