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
import logo from "../../assets/icons/logo.svg";
import { useTweetId } from "../../contexts/TweetIdContext";
import { useDataUpdate } from "../../contexts/UserDataContext";
const UserPage = () => {
  const token = localStorage.getItem("token");
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  const userId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([]);
  const [userReplied, setUserReplied] = useState([]);
  const [userLike, setUserLike] = useState([]);
  // 確保先取得資料再渲染元件畫面
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const { account } = useParams(); //取得用戶account反映在路徑上
  const { id } = useParams(); //取得貼文id反映在路徑上
  const { handleTweetClick } = useTweetId(); //更新貼文id
  const otherUserId = localStorage.getItem("otherUserId");
  const location = useLocation();
  const { isDataUpdate, setIsDataUpdate } = useDataUpdate();
 
  // 點擊user追蹤者資訊欄位，進入follow頁面
  function handleFollowDetailClick(account) {
    navigate(`/${account}/follower`);
  }
  //  追蹤要返回的上一頁
  const handleBack = () => {
    const prevLocation = location.state?.from || "/home";
    navigate(prevLocation);
  };
  
  // 當收回讚時重新渲染喜歡的內容
  const handleUnlike = (unlikedTweetId) => {
    const updatedUserLike = userLike.filter(
      (tweet) => tweet.id !== unlikedTweetId
    );
    setUserLike(updatedUserLike);
  };

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
  }, [isDataUpdate]);
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
  }, [isDataUpdate]);
  //  驗證token是否存在
  useEffect(() => {
    if (!token && role === "admin") {
      navigate("/login");
    }
  }, [navigate, token, role]);
  return (
    <FontendLayout>
      {loading ? (
        <div className={styles.loading}>
          <img className={styles.loadingIcon} src={logo} art="loading..." />
          <div className={styles.loadingText}>Loading...</div>
        </div>
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
              handleFollowDetail={() =>
                handleFollowDetailClick(userInfo.account)
              }
            />
          </div>
          <div className={styles.tabs}>
            <TweetTabs
              tweets={userTweets}
              replies={userReplied}
              likes={userLike}
              onTweetClick={(id) => handleTweetClick(id, location)}
              onLikeClick={handleUnlike}
            />
          </div>
        </>
      )}
    </FontendLayout>
  );
};
export default UserPage;
