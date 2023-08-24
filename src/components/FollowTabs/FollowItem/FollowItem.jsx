import React from "react";
import styles from "./FollowItem.module.scss";
import IconDefaultAvatar from "../../../assets/icons/default-img.svg";
import FollowingBtn from "../../shared/shareBtn/FollowingBtn";
import FollowBtn from "../../shared/shareBtn/FollowBtn";

const FollowItem = ({ id, name, userAvatar, description, isFollowed }) => {
  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.avatar}
          src={userAvatar ? userAvatar : IconDefaultAvatar}
          alt="avatar"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <div className={styles.name}>{name}</div>
          <div className={styles.button}>
            {isFollowed ? (
              <FollowingBtn text={"正在跟隨"} />
            ) : (
              <FollowBtn text={"跟隨"} />
            )}
          </div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default FollowItem;
