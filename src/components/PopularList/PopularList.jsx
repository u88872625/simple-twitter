import React, { useEffect, useState } from "react";
import styles from "./PopularList.module.scss";
import IconDefaultAvatar from "../../assets/icons/default-img.svg";
import FollowBtn from "../shared/shareBtn/FollowBtn";
import FollowingBtn from "../shared/shareBtn/FollowingBtn";

import { getTopUsers } from "../../api/tweets";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PopularList() {
  const [topUsers, setTopUsers] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getTopUsersAsync = async () => {
      try {
        const topUsers = await getTopUsers();
        setTopUsers(topUsers.map((topUser) => ({ ...topUser })));
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      getTopUsersAsync();
    } else {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      <div className={styles.popularList}>
        <p className={styles.popularListTitle}>推薦跟隨</p>
        <div className={styles.popularListLine}></div>
        <PopularListContent topUsers={topUsers} />
      </div>
    </div>
  );
}

function PopularListContent({ topUsers }) {
  return (
    <>
      {topUsers.map((topUser) => {
        return <PopularListItem key={topUser.id} topUser={topUser} />;
      })}
    </>
  );
}

function PopularListItem({ topUser }) {
  const { id, avatar, name, account, isFollowed } = topUser;
  return (
    <div id={id} className={styles.popularListItem}>
      {/* 暫時使用預設頭像 */}
      <div className={styles.PopularListItemAvatar}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : IconDefaultAvatar}
        ></img>
      </div>
      <div className={styles.popularItemInfo}>
        <p className={styles.popularItemName}>{name}</p>
        <p className={styles.popularItemAccount}>@{account}</p>
      </div>

      {/* 暫時使用單一Btn */}
      <div className={styles.popularItemBtn}>
        {isFollowed ? (
          <FollowingBtn text={"正在跟隨"} />
        ) : (
          <FollowBtn text={"跟隨"} />
        )}
      </div>
    </div>
  );
}
