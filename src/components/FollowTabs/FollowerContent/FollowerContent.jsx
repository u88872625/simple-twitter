import React from "react";
import styles from "./FollowerContent.module.scss";
import FollowItem from "../FollowItem/FollowItem";

const FollowerContent = ({ followers, rerender, setRerender }) => {
  return (
    <div>
      {followers ? (
        followers.map((follower) => {
          const { id, avatar, name, followerId, isFollowed, introduction } =
            follower;
          return (
            <FollowItem
              key={id}
              id={followerId}
              avatar={avatar}
              name={name}
              introduction={introduction}
              isFollowed={isFollowed}
              rerender={rerender}
              setRerender={setRerender}
            />
          );
        })
      ) : (
        <div className={styles.margin}>
          <div></div>
          <span>（此使用者尚未被任何人跟隨）</span>
        </div>
      )}
    </div>
  );
};

export default FollowerContent;
