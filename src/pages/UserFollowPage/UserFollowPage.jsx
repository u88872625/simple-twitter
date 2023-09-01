import React, { useState, useEffect } from "react";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout";
import FollowTabs from "../../components/FollowTabs/FollowTabs";
import logo from "../../assets/icons/logo.svg";
import arrow from "../../assets/icons/back.svg";
import styles from "./UserFollowPage.module.scss";
import { getUserFollowers, getUserFollowings } from "../../api/tweets";
import { getUserTweet } from "../../api/user";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const UserFollowPage = () => {
  const userId = localStorage.getItem("userId");
  const [userTweets, setUserTweets] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
   const [loading, setLoading] = useState(true);
  // 與popularList聯動重新渲染
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // 追蹤要返回的上一頁
  const handleBack = () => {
    const prevLocation = `/${currentUser?.account}`;
    navigate(prevLocation);
  };

  useEffect(() => {
    // 取得所有followers資料
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(userId);

        setUserFollowings(followings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); //當取得資料後變回false
      }
    };
    //  取得所有followers資料
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(userId);

        setUserFollowers(followers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); //當取得資料後變回false
      }
    };

    // 取得所有貼文
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

    if (userId) {
      getUserFollowingsAsync();
      getUserFollowersAsync();
      getUserTweetAsync();
    } else {
      navigate("/login");
    }
  }, [rerender, userId, navigate]);

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
                className={styles.backArrow}
                src={arrow}
                onClick={handleBack}
              ></img>
              <div className={styles.userInfo}>
                <h5 className={styles.name}>{currentUser?.name}</h5>
                <p className={styles.tweetCount}> {userTweets.length}推文</p>
              </div>
            </div>
            <FollowTabs
              followers={userFollowers}
              followings={userFollowings}
              rerender={rerender}
              setRerender={setRerender}
            />
          </>
        )}
      </FontendLayout>
    </div>
  );
};

export default UserFollowPage;
