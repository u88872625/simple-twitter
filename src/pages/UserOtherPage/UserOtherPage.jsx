import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/logo.svg";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout";
import OtherUserInfo from "../../components/InfoCard/OtherUserInfoCard";
import TweetTabs from "../../components/TweetTabs/TweetTabs";
import {
  getUserInfo,
  getUserTweet,
  getUserReplied,
  getUserLike,
} from "../../api/user";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTweetId } from "../../contexts/TweetIdContext";
import arrow from "../../assets/icons/back.svg";
import styles from "./UserOtherPage.module.scss";

const UserOtherPage = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const otherUserId = localStorage.getItem("otherUserId");
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  const [otherUserInfo, setOtherUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([]);
  const [userReplied, setUserReplied] = useState([]);
  const [userLike, setUserLike] = useState([]);
  // 與popularList聯動重新渲染
  const [rerender, setRerender] = useState(false);
  // 確保先取得userTweets再渲染TweetTabs
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { account } = useParams(); //取得用戶account反映在路徑上
  const { id } = useParams(); //取得貼文id反映在路徑上
  const { handleTweetClick } = useTweetId(); //更新貼文id

  const location = useLocation();

  // 點擊user追蹤者資訊欄位，進入follow頁面
  function handleFollowDetailClick(account) {
    navigate(`/other/${account}/follower`);
  }

  // 追蹤要返回的上一頁
  const handleBack = () => {
    const prevLocation = location.state?.from || "/home";
    navigate(prevLocation);
  };

  useEffect(() => {
    if (otherUserId) {
      const getOtherUserInfoAsync = async () => {
        try {
          const otherUserInfo = await getUserInfo(otherUserId);
          setOtherUserInfo(otherUserInfo);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getOtherUserInfoAsync();
    }
  }, [otherUserId, rerender]);
  useEffect(() => {
    if (otherUserId) {
      const getUserTweetAsync = async () => {
        try {
          const userTweets = await getUserTweet(otherUserId);
          setUserTweets(userTweets);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserTweetAsync();
    }
  }, [otherUserId]);
  useEffect(() => {
    if (otherUserId) {
      const getUserRepliedAsync = async () => {
        try {
          const userReplied = await getUserReplied(otherUserId);
          setUserReplied(userReplied);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserRepliedAsync();
    }
  }, [otherUserId]);
  useEffect(() => {
    if (otherUserId) {
      const getUserLikeAsync = async () => {
        try {
          const userLike = await getUserLike(otherUserId);
          setUserLike(userLike);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserLikeAsync();
    }
  }, [otherUserId]);
  // 驗證token是否存在;
  useEffect(() => {
    if (!token && role === "admin") {
      navigate("/login");
    }
  }, [navigate, token, role]);
  return (
    <div>
      <FontendLayout rerender={rerender} setRerender={setRerender}>
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
                <h5 className={styles.name}>{otherUserInfo?.name}</h5>
                <span className={styles.sub}>{userTweets.length}推文</span>
              </div>
            </div>
            <div className={styles.infoCard}>
              <OtherUserInfo
                info={otherUserInfo}
                handleFollowDetail={() =>
                  handleFollowDetailClick(otherUserInfo.account)
                }
                rerender={rerender}
                setRerender={setRerender}
              />
            </div>
            <div className={styles.tabs}>
              <TweetTabs
                tweets={userTweets}
                replies={userReplied}
                likes={userLike}
                onTweetClick={(id) => handleTweetClick(id, location)}
              />
            </div>
          </>
        )}
      </FontendLayout>
    </div>
  );
};

export default UserOtherPage;
