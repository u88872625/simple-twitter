import styles from "./AdminTweetItem.module.scss";
import close from '../../../../assets/icons/close-black.svg'

export default function AdminTweetItem({ tweet , onClick }) {
	const maxLength = 50
	const truncatedText =
    tweet.post.textContent.length > 50
      ? tweet.post.textContent.slice(0, maxLength) + "..."
      : tweet.post.textContent;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.avatar} src={tweet.avatar} alt="avatar" />
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{tweet.name}</p>
            <p className={styles.acount}>
              @{tweet.account} · {tweet.post.createdAt}
            </p>
          </div>
          <p className={styles.text}>{truncatedText}</p>
        </div>
      </div>
      <img
        className={styles.closeIcon}
        src={close}
        alt="close-icon"
        onClick={onClick}
      />
    </div>
  );
}
