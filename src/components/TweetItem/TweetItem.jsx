import styles from "./TweetItem.module.scss";
import reply from "../../assets/icons/reply.svg";
import like from "../../assets/icons/like.svg";

export default function TweetItem({ tweet }) {
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
            <div className={styles.reply}>
              <img src={reply} alt="num-of-replies" />
              <span>{tweet.tweet.numOfReply}</span>
            </div>
            <div className={styles.like}>
              <img src={like} alt="num-of-likes" />
              <span>{tweet.tweet.numOfLike}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
