import React from "react";
import styles from "./ReplyItem.module.scss";
// import { ReactComponent as IconDefaultAvatar } from "../../assets/icons/default-img.svg";

const ReplyItem = ({ tweet }) => {
  return (
    <div className={styles.container}>
      {/* 暫時使用預設頭像 */}
      <img className={styles.avatar} src={tweet.avatar} alt="avatar" />
      <div className={styles.replyInfo}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{tweet.userName}</span>
          <span className={styles.userAcount}>
            @{tweet.accountName}．{tweet.reply.createdAt}
          </span>
        </div>

        {/* 回覆對象 */}
        <div className={styles.replyNameWrapper}>
          <div className={styles.replyTitle}>
            回覆
            <span className={styles.replyName}>@{tweet.reply.whoTweet}</span>
          </div>
        </div>
        <div className={styles.replyMessage}>
          <p className={styles.replyMessageText}>{tweet.reply.replyContent}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
