import React, { useState, useEffect } from "react";
import styles from "../styles/_loading.module.scss";
import FontendLayout from "../components/shared/layout/FontendLayout/FontendLayout";
import AddTweet from "../components/AddTweet/AddTweet";
import TweetContent from "../components/TweetTabs/TweetContent/TweetContent";
import logo from "../assets/icons/logo.svg";
import { getUserInfo } from "../api/user";
import { getAllTweets } from "../api/tweets";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useTweetId } from "../contexts/TweetIdContext";

const MainPage = () => {
  const [tweets, setTweets] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, setIsTweetUpdated, isTweetUpdated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = currentUser?.id;
  const role = currentUser?.role;
  const { handleTweetClick } = useTweetId(); //更新貼文id
  const location = useLocation();

  useEffect(() => {
    if (userId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          setUserInfo(userInfo);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
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
      } finally {
        setLoading(false); //當取得資料後變回false
      }
    };
    getTweetsAsync();
  }, []);

  // 送出推文後，回傳一個已更新過的所有推文陣列
  useEffect(() => {
    const fetchNewTweets = async () => {
      try {
        const newTweets = await getAllTweets();
        setTweets(newTweets);
      } catch (error) {
        console.error(error);
      }
    };

    if (isTweetUpdated) {
      fetchNewTweets();
      setIsTweetUpdated(false); // 設定回 false 以便下次更新
    }
  }, [isTweetUpdated, setIsTweetUpdated]);

  useEffect(() => {
    if (!token && role === "admin") {
      navigate("/login");
    }
  }, [navigate, token, role]);

  return (
    <div>
      <FontendLayout>
        {loading ? (
          <div className={styles.loading}>
            <img className={styles.loadingIcon} src={logo} art="loading..." />
            <div className={styles.loadingText}>Loading...</div>
          </div>
        ) : (
          <>
            <AddTweet avatar={userInfo.avatar} />
            <TweetContent
              tweets={tweets}
              userAvatar={userInfo.avatar}
              onTweetClick={(id) => handleTweetClick(id, location)}
            />
          </>
        )}
      </FontendLayout>
    </div>
  );
};

export default MainPage;
