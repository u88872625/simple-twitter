import React, { useEffect, useState } from "react";
import styles from "./PopularList.module.scss";
import IconDefaultAvatar from "../../assets/icons/default-img.svg";
import FollowBtn from "../shared/shareBtn/FollowBtn";
import FollowingBtn from "../shared/shareBtn/FollowingBtn";
import { getTopUsers, userFollow, unFollow } from "../../api/tweets";
import { getUserInfo } from "../../api/user";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PopularList({ rerender, setRerender }) {
  const token = localStorage.getItem("token");
  const [topUsers, setTopUsers] = useState([]);
  // popularList 自己的重新渲染
  const [rerenderSelf, setRerenderSelf] = useState(false);
  const navigate = useNavigate();

  // 追蹤
  const userFollowAsync = async (token, id) => {
    try {
      const res = await userFollow(token, id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // 去銷追蹤
  const userUnfollowAsync = async (token, id) => {
    try {
      const res = await unFollow(token, id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // 設定追蹤、取消追蹤功能
  const handleFollowClick = async (topUserId, isFollowed) => {
    if (isFollowed) {
      await userUnfollowAsync(token, topUserId);
    } else {
      await userFollowAsync(token, topUserId);
    }

    if (setRerender) {
      await setRerender(!rerender);
    } else {
      setRerenderSelf(!rerenderSelf);
    }
  };

  // 取得top10的使用者資料
  useEffect(() => {
    const getTopUsersAsync = async () => {
      try {
        const topUsers = await getTopUsers();
        setTopUsers(topUsers.map((topUser) => ({ ...topUser })));
      } catch (error) {
        console.error(error);
      }
    };
    getTopUsersAsync();
  }, [rerender, rerenderSelf]);

  return (
    <div>
      <div className={styles.popularList}>
        <p className={styles.popularListTitle}>推薦跟隨</p>
        <div className={styles.popularListLine}></div>
        {topUsers.map((topUser) => {
          return (
            <PopularListItem
              key={topUser.id}
              topUser={topUser}
              handleFollowClick={handleFollowClick}
            />
          );
        })}
      </div>
    </div>
  );
}

function PopularListItem({ topUser, handleFollowClick }) {
  const { id, avatar, name, account, isFollowed } = topUser;
  // 讓使用者即時看到跟隨按鈕變化
  const [followState, setFollowState] = useState(isFollowed);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // 點擊頭像
  const handleClick = async () => {
    // 如果點選自己
    if (id === userId) {
      navigate(`/${account}`);
    } else {
      // 如果點到其他人
      localStorage.setItem("otherUserId", id);
      const otherUserInfo = await getUserInfo(id);
      console.log("tweetitem:", otherUserInfo);
      const otherUserAccount = otherUserInfo.account;
      navigate(`/other/${otherUserAccount}`);
    }
  };

  useEffect(() => {
    setFollowState(isFollowed);
  }, [isFollowed]);

  return (
    <div id={id} className={styles.popularListItem}>
      {/* 暫時使用預設頭像 */}
      <div className={styles.PopularListItemAvatar}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : IconDefaultAvatar}
          onClick={handleClick}
        ></img>
      </div>
      <div className={styles.popularItemInfo}>
        <p className={styles.popularItemName}>{name}</p>
        <p className={styles.popularItemAccount}>@{account}</p>
      </div>

      {/* 暫時使用單一Btn */}
      <div className={styles.popularItemBtn}>
        {isFollowed ? (
          <FollowingBtn
            text={"正在跟隨"}
            onClick={() => {
              setFollowState(!followState);
              handleFollowClick(id, isFollowed);
            }}
          />
        ) : (
          <FollowBtn
            text={"跟隨"}
            onClick={() => {
              setFollowState(!followState);
              handleFollowClick(id, isFollowed);
            }}
          />
        )}
      </div>
    </div>
  );
}
