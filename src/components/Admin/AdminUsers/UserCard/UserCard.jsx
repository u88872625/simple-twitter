import React from "react";
import styles from "./UserCard.module.scss";
import DefaultBanner from "../../../../assets/images/bg-other.png";
import DefaultAvatar from "../../../../assets/icons/default-img.svg";
import IconTweets from "../../../../assets/icons/tweets.svg";
import IconLike from "../../../../assets/icons/like.svg";

const UserCard = ({
  banner,
  avatar,
  name,
  account,
  tweetCount,
  likeCount,
  followingCount,
  followerCount,
}) => {
  return (
    <div className={styles.container}>
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
        <div className={styles.name}>{"name"}</div>
        <div className={styles.account}>@{"account"}</div>
      </div>
      <div className={styles.IconWrapper}>
        <img className={styles.tweetIcon} src={IconTweets} />
        <span className={styles.tweetCount}>{tweetCount}1.5K</span>
        <img className={styles.likeIcon} src={IconLike} />
        <span className={styles.likeCount}>{likeCount}1.5K</span>
      </div>
      <div className={styles.folllowInfo}>
        <div className={styles.folllowing}>
          <span className={styles.folllowCount}>{followingCount}39個</span>
          <span className={styles.folllowText}>跟隨中</span>
        </div>
        <div className={styles.folllower}>
          <span className={styles.folllowCount}>{followerCount}45位</span>
          <span className={styles.folllowText}>跟隨者</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
