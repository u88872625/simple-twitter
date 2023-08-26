import styles from "./TweetItem.module.scss";
import reply from "../../assets/icons/reply.svg";
import like from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import { useState } from "react";

export default function TweetItem({ tweet, onClick }) {
  let { name, account, avatar } = tweet.User;
  const { id, UserId, description, createdAt, repliesNum, likesNum, isLiked } =
    tweet;
  const [isReply, setIsReply] = useState(false);

  const handleReplyClick = () => {
    setIsReply(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{name}</p>
            <p className={styles.acount}>
              @{account} · {createdAt}
            </p>
          </div>
          <p className={styles.text}>{description}</p>
          <div className={styles.bottom}>
            <div className={styles.reply} onClick={handleReplyClick}>
              <img src={reply} alt="num-of-replies" />
              <span>{repliesNum}</span>
            </div>
            <div className={styles.like} onClick={onClick}>
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
