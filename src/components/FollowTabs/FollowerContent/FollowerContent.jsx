import React from "react";
import styles from "./FollowerContent.module.scss";
import FollowItem from "../FollowItem/FollowItem";

const FollowerContent = ({ followers }) => {
  return (
    <div>
      {followers ? (
        followers.map((follower) => (
          <FollowItem
            key={follower.id}
            name={follower.name}
            userAvatar={follower.avatar}
            description={follower.description}
            isFollowed={follower.isFollowed}
          />
        ))
      ) : (
        // 當沒有追隨者時顯示
        <div className={styles.noFollower}>
          <p>尚無追隨者</p>
        </div>
      )}
    </div>
  );
};

export default FollowerContent;
