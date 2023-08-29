import React, { useState, useEffect } from "react";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout";
import FollowTabs from "../../components/FollowTabs/FollowTabs";
import arrow from "../../assets/icons/back.svg";
import styles from "./UserFollowPage.module.scss";
import { getUserFollowers, getUserFollowings } from "../../api/tweets";
import { getUserTweet } from "../../api/user";
import { useNavigate } from "react-router-dom";

const UserFollowPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo.id;
  const [userTweets, setUserTweets] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  // 與popularList聯動重新渲染
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();

  // 返回上一頁
  function handleUserInfoClick() {
    navigate("/:id");
  }

  useEffect(() => {
    // 取得所有followers資料
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(userId);

        setUserFollowings(followings);
      } catch (error) {
        console.error(error);
      }
    };
    //  取得所有followers資料
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(userId);

        setUserFollowers(followers);
      } catch (error) {
        console.error(error);
      }
    };

    // 取得所有貼文
    const getUserTweetAsync = async () => {
      try {
        const userTweets = await getUserTweet(userId);
        setUserTweets(userTweets);
      } catch (error) {
        console.error(error);
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
        <div className={styles.header}>
          <img
            className={styles.backArrow}
            src={arrow}
            onClick={handleUserInfoClick}
          ></img>
          <div className={styles.userInfo}>
            <h5 className={styles.name}>{userInfo.name}</h5>
            <p className={styles.tweetCount}> {userTweets.length}推文</p>
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

export default UserFollowPage;
