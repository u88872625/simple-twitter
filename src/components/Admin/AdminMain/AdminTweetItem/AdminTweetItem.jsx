import styles from "./AdminTweetItem.module.scss";
import close from '../../../../assets/icons/close-black.svg'

export default function AdminTweetItem({ tweet , onClick }) {
	const maxLength = 50
	const truncatedText =
    tweet.description.length > 50
      ? tweet.description.slice(0, maxLength) + "..."
      : tweet.description;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.avatar} src={tweet.User.avatar} alt="avatar" />
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{tweet.User.name}</p>
            <p className={styles.acount}>
              @{tweet.User.account} · {tweet.updatedAt}
            </p>
          </div>
          <p className={styles.text}>{truncatedText}</p>
        </div>
      </div>
      <img
        className={styles.closeIcon}
        src={close}
        alt="close-icon"
        onClick={()=>onClick?.(tweet.id)}
      />
    </div>
  );
}
