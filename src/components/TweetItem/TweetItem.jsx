import styles from "./TweetItem.module.scss";
import reply from "../../assets/icons/reply.svg";
import like from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import defaultAvatar from "../../assets/icons/default-img.svg";
import { useState } from "react";

export default function TweetItem({ tweet, onClick,onTweetClick }) {
  let { name, account, avatar } = tweet.User;
  const { id, UserId, description, createdAt, repliesNum, likesNum, isLiked, fromNow } =
    tweet;
  const [isReply, setIsReply] = useState(false);


  const handleReplyClick = () => {
    setIsReply(true);
  };

  // 追蹤哪個貼文被按讚
  const handleLikeClick = () => {
    onClick(id);
  };

  return (
    <div className={styles.container} onClick={()=>{onTweetClick?.(id)}}>
      <div className={styles.wrapper}>
        {avatar ? (
          <img className={styles.avatar} src={avatar} alt="avatar" />
        ) : (
          <img
            className={styles.avatar}
            src={defaultAvatar}
            alt="defalt-avatar"
          />
        )}
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{name}</p>
            <p className={styles.acount}>
              @{account} · {fromNow}
            </p>
          </div>
          <p className={styles.text}>{description}</p>
          <div className={styles.bottom}>
            <div className={styles.reply} onClick={handleReplyClick}>
              <img src={reply} alt="num-of-replies" />
              <span>{repliesNum}</span>
            </div>
            <div className={styles.like} onClick={handleLikeClick}>
             {isLiked ? (
                <img src={likeFilled} alt="like-fill" />
              ) : (
                <img src={like} alt="like" />
              )}
              <span>{likesNum}</span>
            </div>
          </div>
        </div>
      </div>
      {/* {isReply && <Modal/>} */}
    </div>
  );
}
