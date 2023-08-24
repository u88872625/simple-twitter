import styles from "./TweetItem.module.scss";
import reply from "../../assets/icons/reply.svg";
import like from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import { useState } from "react";

export default function TweetItem({ tweet ,onClick}) {
  const [isReply, setIsReply] = useState(false);
  

  const handleReplyClick = () => {
    setIsReply(true);
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.avatar} src={tweet.avatar} alt="avatar" />
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{tweet.userName}</p>
            <p className={styles.acount}>
              @{tweet.accountName} · {tweet.tweet.createdAt}
            </p>
          </div>
          <p className={styles.text}>{tweet.tweet.textContent}</p>
          <div className={styles.bottom}>
            <div className={styles.reply} onClick={handleReplyClick}>
              <img src={reply} alt="num-of-replies" />
              <span>{tweet.tweet.numOfReply}</span>
            </div>
            <div className={styles.like} onClick={onClick}>
              {tweet.tweet.isLike ? (
                <img src={likeFilled} alt="like-fill" />
              ) : (
                <img src={like} alt="like" />
              )}
              <span>{tweet.tweet.numOfLike}</span>
            </div>
          </div>
        </div>
      </div>
      {/* {isReply && <Modal/>} */}
    </div>
  );
}
