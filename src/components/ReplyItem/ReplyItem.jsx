import React from "react";
import styles from "./ReplyItem.module.scss";
import defaultAvatar from "../../assets/icons/default-img.svg";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";

const ReplyItem = ({ tweet }) => {
  return (
    <div className={styles.container}>
      {tweet.User.avatar ? (
        <img className={styles.avatar} src={tweet.User.avatar} alt="avatar" />
      ) : (
        <img
          className={styles.avatar}
          src={defaultAvatar}
          alt="defalt-avatar"
        />
      )}
      <div className={styles.replyInfo}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{tweet.User.name}</span>
          <span className={styles.userAcount}>
            @{tweet.User.account}．{tweet.fromNow}
          </span>
        </div>

        {/* 回覆對象 */}
        <div className={styles.replyNameWrapper}>
          <div className={styles.replyTitle}>
            回覆
            <span className={styles.replyName}>
              @{tweet.repliedTo ? tweet.repliedTo : tweet.User.account}
            </span>
          </div>
        </div>
        <div className={styles.replyMessage}>
          <p className={styles.replyMessageText}>{tweet.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
