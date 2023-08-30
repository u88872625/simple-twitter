import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getUserInfo,
  getUserTweet,
  getUserReplied,
  getUserLike,
} from "../../api/user";
import { getTopTweet } from "../../api/tweets";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./UserPage.module.scss";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout.jsx";
import UserInfoCard from "../../components/InfoCard/UserInfoCard";
import TweetTabs from "../../components/TweetTabs/TweetTabs";
import arrow from "../../assets/icons/back.svg";
import { useTweetId } from "../../contexts/TweetIdContext";

const UserPage = () => {
  const userId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([]);
  const [userReplied, setUserReplied] = useState([]);
  const [userLike, setUserLike] = useState([]);
  // 確保先取得userTweets再渲染TweetTabs
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { account } = useParams(); //取得用戶account反映在路徑上
  const { id } = useParams(); //取得貼文id反映在路徑上
  const { handleTweetClick } = useTweetId(); //更新貼文id
  const location = useLocation();

  // // 追蹤單一貼文點擊
  // const handleTweetClick = async (id) => {
  //   console.log("tweetid:", id);
  //   setTweetId(id);
  //   navigate(`/status/${id}`);
  // };

  // 點擊user追蹤者資訊欄位，進入follow頁面
  function handleFollowDetailClick() {
    navigate("/:username/followers");
  }

  // 追蹤要返回的上一頁
  const handleBack = () => {
    const prevLocation = location.state?.from || "/home";
    navigate(prevLocation);
  };

  // 更新對應推文的like數 後續需要把變動傳回後端
  const handleLikeClick = (tweetId) => {
    const newTweet = userTweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          isLike: !tweet.isLiked,
          likesNum: tweet.isLiked ? tweet.likesNum - 1 : tweet.likesNum + 1,
        };
      }
      return tweet;
    });
    setUserTweets(newTweet);
  };

  useEffect(() => {
    if (userId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          console.log("User Info:", userInfo);
          setUserInfo(userInfo);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserInfoAsync();
    }
  }, []);
  useEffect(() => {
    if (userId) {
      const getUserTweetAsync = async () => {
        try {
          const userTweets = await getUserTweet(userId);
          setUserTweets(userTweets);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserTweetAsync();
    }
  }, []);
  useEffect(() => {
    if (userId) {
      const getUserRepliedAsync = async () => {
        try {
          const userReplied = await getUserReplied(userId);
          setUserReplied(userReplied);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserRepliedAsync();
    }
  }, []);
  useEffect(() => {
    if (userId) {
      const getUserLikeAsync = async () => {
        try {
          const userLike = await getUserLike(userId);
          setUserLike(userLike);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserLikeAsync();
    }
  }, []);
  //  驗證token是否存在
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <FontendLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.header}>
            <img
              className={styles.arrow}
              src={arrow}
              alt="arrow"
              onClick={handleBack}
            />
            <div className={styles.text}>
              <h5 className={styles.name}>{userInfo?.name}</h5>
              <span className={styles.sub}>{userTweets.length}推文</span>
            </div>
          </div>
          <div className={styles.infoCard}>
            <UserInfoCard
              info={userInfo}
              handleFollowDetail={handleFollowDetailClick}
            />
          </div>
          <div className={styles.tabs}>
            <TweetTabs
              tweets={userTweets}
              replies={userReplied}
              likes={userLike}
              onClick={handleLikeClick}
              onTweetClick={(id) => handleTweetClick(id, location)}
            />
          </div>
        </>
      )}
    </FontendLayout>
  );
};
export default UserPage;
