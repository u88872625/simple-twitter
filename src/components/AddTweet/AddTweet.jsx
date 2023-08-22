import React from "react";
import styles from "./AddTweet.module.scss";
import ReplyBtn from "../shared/shareBtn/ReplyBtn";
import avatarUser from "../../assets/images/avater-user.png";

const AddTweet = () => {
  return (
    <div className={styles.AddTweetContainer}>
      <div className={styles.title}>
        <h4>首頁</h4>
      </div>
      <div className={styles.AddTweet}>
        <div className={styles.content}>
          {/* 暫時用UI設計頭像代替 */}
          <img className={styles.avatar} src={avatarUser} />
          <h5 className={styles.placeholder}>有什麼新鮮事？</h5>
        </div>
        <div className={styles.button}>
          <ReplyBtn text={"推文"} />
        </div>
      </div>
    </div>
  );
};

export default AddTweet;
