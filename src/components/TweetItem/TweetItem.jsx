import styles from "./TweetItem.module.scss";
import reply from "../../assets/icons/reply.svg";
import like from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import defaultAvatar from "../../assets/icons/default-img.svg";
import { useState } from "react";

export default function TweetItem({ tweet, onClick }) {
  let { name, account, avatar } = tweet.User;
  const { id, UserId, description, createdAt, repliesNum, likesNum, isLiked } =
    tweet;
  const [isReply, setIsReply] = useState(false);

  const handleReplyClick = () => {
    setIsReply(true);
  };

  // 追蹤哪個貼文被按讚
  const handleLikeClick = () => {
    onClick(tweet.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {tweet.User.avatar ? (
          <img className={styles.avatar} src={tweet.User.avatar} alt="avatar" />
        ) : (
          <img
            className={styles.avatar}
            src={defaultAvatar}
            alt="defalt-avatar"
          />
        )}
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{tweet.User.name}</p>
            <p className={styles.acount}>
              @{tweet.User.account} · {tweet.fromNow}
            </p>
          </div>
          <p className={styles.text}>{tweet.description}</p>
          <div className={styles.bottom}>
            <div className={styles.reply} onClick={handleReplyClick}>
              <img src={reply} alt="num-of-replies" />
              <span>{tweet.repliesNum}</span>
            </div>
            <div className={styles.like} onClick={handleLikeClick}>
              {tweet.isLiked ? (
                <img src={likeFilled} alt="like-fill" />
              ) : (
                <img src={like} alt="like" />
              )}
              <span>{tweet.likesNum}</span>
            </div>
          </div>
        </div>
      </div>
      {/* {isReply && <Modal/>} */}
    </div>
  );
}
