import styles from './TweetItem.module.scss'
import reply from '../../assets/icons/reply.svg'
import like from "../../assets/icons/like.svg";

export default function TweetItem({userName, userAcount, userPhoto, updateTime, textContent, replies, likes}) {
	return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.avatar} src={userPhoto} alt="avatar" />
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{userName}</p>
            <p className={styles.acount}>@{userAcount} · {updateTime}</p>
          </div>
          <p className={styles.text}>
            {textContent}
          </p>
          <div className={styles.bottom}>
            <div className={styles.reply}>
              <img src={reply} alt="num-of-replies" />
              <span>{replies}</span>
            </div>
            <div className={styles.like}>
              <img src={like} alt="num-of-likes" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}