import React, { useState, useEffect } from "react";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout";
import FollowTabs from "../../components/FollowTabs/FollowTabs";
import arrowIcon from "../../assets/icons/back.svg";
import styles from "./UserOtherFollowPage.module.scss";
import { getUserFollowers, getUserFollowings } from "../../api/tweets";
import { getUserInfo, getUserTweet } from "../../api/user";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const UserOtherFollowPage = () => {
  const userId = localStorage.getItem("userId");
  const otherUserId = localStorage.getItem("otherUserId");
  const [userInfo, setUserInfo] = useState([]);
  const [userTweets, setUserTweets] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  // 與popularList聯動重新渲染
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
	const location = useLocation();
  const { currentUser } = useAuth();

 

  // 追蹤要返回的上一頁
  const handleBack = () => {
    const prevLocation = `/other/${userInfo.account}`;
    navigate(prevLocation);
  };

  useEffect(() => {
    const getUserInfoAsync = async () => {
      try {
        const userInfo = await getUserInfo(otherUserId);
        console.log("User Info:", userInfo);
        setUserInfo(userInfo);
      } catch (error) {
        console.error(error);
      }
    };
    // 取得所有followers資料
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(otherUserId);

        setUserFollowings(followings);
      } catch (error) {
        console.error(error);
      }
    };
    //  取得所有followers資料
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(otherUserId);

        setUserFollowers(followers);
      } catch (error) {
        console.error(error);
      }
    };

    // 取得所有貼文
    const getUserTweetAsync = async () => {
      try {
        const userTweets = await getUserTweet(otherUserId);
        setUserTweets(userTweets);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      getUserInfoAsync();
      getUserFollowingsAsync();
      getUserFollowersAsync();
      getUserTweetAsync();
    } else {
      navigate("/login");
    }
  }, [rerender, otherUserId, navigate]);

  return (
    <div>
      <FontendLayout rerender={rerender} setRerender={setRerender}>
        <div className={styles.header}>
          <img
            className={styles.backArrow}
            src={arrowIcon}
            onClick={handleBack}
          ></img>
          <div className={styles.userInfo}>
            <h5 className={styles.name}>{userInfo?.name}</h5>
            <p className={styles.tweetCount}> {userTweets?.length}推文</p>
          </div>
        </div>
        <FollowTabs
          followers={userFollowers}
          followings={userFollowings}
          rerender={rerender}
          setRerender={setRerender}
        />
      </FontendLayout>
    </div>
  );
};

export default UserOtherFollowPage;
