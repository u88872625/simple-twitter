import React, { useState, useEffect } from "react";
import styles from "./PopularList.module.scss";
import { ReactComponent as IconDefaultAvatar } from "../../assets/icons/default-img.svg";
import FollowBtn from "../shared/shareBtn/FollowBtn";
import FollowingBtn from "../shared/shareBtn/FollowingBtn";
// import { getTopUsers } from "../../api/tweets";

export default function PopularList() {
  // const [topUsers, setTopUsers] = useState([]);

  // useEffect(() => {
  //   const getTopUsersAsync = async () => {
  //     try {
  //       const topUsers = await getTopUsers();
  //       setTopUsers(topUsers.map((user) => ({ ...user })));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getTopUsersAsync();
  // }, []);

  return (
    <div>
      <div className={styles.popularList}>
        <p className={styles.popularListTitle}>推薦跟隨</p>
        <div className={styles.popularListLine}></div>
        {/* {topUsers.map((user) => {
          const { id, name, account, avatar, isFollowed } = user; */}
        <PopularListItem
        // id={id}
        // name={name}
        // account={account}
        // avatar={avatar}
        // isFollowed={isFollowed}
        />
        ; })}
      </div>
    </div>
  );
}

function PopularListItem({ id, name, account, avatar, isFollowed }) {
  return (
    <div className={styles.popularListItem}>
      {/* 暫時使用預設頭像 */}
      <div className={styles.PopularListItemAvatar}>
        <IconDefaultAvatar />
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
