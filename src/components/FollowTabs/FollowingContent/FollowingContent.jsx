import React from "react";
import FollowItem from "../FollowItem/FollowItem";
import styles from "./FollowingContent.module.scss";

const FollowingContent = ({ followings, rerender, setRerender }) => {
  return (
    <div>
      {followings ? (
        followings.map((following) => {
          const { id, avatar, name, followingId, isFollowed, introduction } =
            following;
          return (
            <FollowItem
              key={id}
              id={followingId}
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

export default FollowingContent;
