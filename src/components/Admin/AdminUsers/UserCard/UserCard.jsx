import React from "react";
import styles from "./UserCard.module.scss";
import DefaultBanner from "../../../../assets/images/bg-other.png";
import DefaultAvatar from "../../../../assets/icons/default-img.svg";
import IconTweets from "../../../../assets/icons/tweets.svg";
import IconLike from "../../../../assets/icons/like.svg";

const UserCard = ({ user }) => {
  const {
    id,
    name,
    account,
    avatar,
    banner,
    tweetsNum,
    likesNum,
    followingsNum,
    followersNum,
  } = user;
  return (
    <div className={styles.container} id={id}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.banner}
          src={banner ? banner : DefaultBanner}
        ></img>
        <img
          className={styles.avatar}
          src={avatar ? avatar : DefaultAvatar}
        ></img>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.account}>@{account}</div>
      </div>
      <div className={styles.IconWrapper}>
        <img className={styles.tweetIcon} src={IconTweets} />
        <span className={styles.tweetCount}>{tweetsNum}</span>
        <img className={styles.likeIcon} src={IconLike} />
        <span className={styles.likeCount}>{likesNum}</span>
      </div>
      <div className={styles.folllowInfo}>
        <div className={styles.folllowing}>
          <span className={styles.folllowCount}>{followingsNum}個</span>
          <span className={styles.folllowText}>跟隨中</span>
        </div>
        <div className={styles.folllower}>
          <span className={styles.folllowCount}>{followersNum}位</span>
          <span className={styles.folllowText}>跟隨者</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
