import React from "react";
import FollowItem from "../FollowItem/FollowItem";
import styles from "./FollowingContent.module.scss";

const FollowingContent = ({ followings }) => {
  return (
    <div>
      {followings ? (
        followings.map((following) => (
          <FollowItem
            name={following.name}
            userAvatar={following.avatar}
            description={following.description}
            isFollowed={following.isFollowed}
          />
        ))
      ) : (
        // 當沒有追隨者時顯示
        <div className={styles.noFollow}>
          <p>尚無追隨其他使用者</p>
        </div>
      )}
    </div>
  );
};

export default FollowingContent;
