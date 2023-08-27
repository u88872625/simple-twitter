import React from "react";
import styles from "./AddTweet.module.scss";
import ReplyBtn from "../shared/shareBtn/ReplyBtn";
import avatarUser from "../../assets/images/avater-user.png";
import clsx from "clsx";

const AddTweet = ({ avatar, value, onChange, inputStyle }) => {
  return (
    <div className={styles.AddTweetContainer}>
      <div className={styles.title}>
        <h4>首頁</h4>
      </div>
      <div className={styles.AddTweet}>
        <img className={styles.avatar} src={avatar ? avatar : avatarUser} />
        <textarea
          className={clsx(styles.input, inputStyle)}
          placeholder="有什麼新鮮事?"
          onChange={(e) => onChange?.(e.target.value)}
          value={value}
        ></textarea>
        <div className={styles.button}>
          <ReplyBtn text={"推文"} />
        </div>
      </div>
    </div>
  );
};

export default AddTweet;
