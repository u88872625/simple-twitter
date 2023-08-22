import React from "react";
import styles from "./ReplyItem.module.scss";
import { ReactComponent as IconDefaultAvatar } from "../../assets/icons/default-img.svg";

const ReplyItem = ({ name, account, time, replyName, message, avatar }) => {
  return (
    <div className={styles.container}>
      {/* 暫時使用預設頭像 */}
      <div className={styles.avatar}>
        <IconDefaultAvatar />
      </div>
      <div className={styles.replyInfo}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{name}</span>
          <span className={styles.userAcount}>
            @{account}．{time}
          </span>
        </div>

        {/* 回覆對象 */}
        <div className={styles.replyNameWrapper}>
          <div className={styles.replyTitle}>
            回覆<span className={styles.replyName}>@{replyName}</span>
          </div>
        </div>
        <div className={styles.replyMessage}>
          <p className={styles.replyMessageText}>{"message"}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
