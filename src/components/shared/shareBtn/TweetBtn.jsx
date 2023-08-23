import React from "react";
import styles from "./_BtnStyle.module.scss";

const TweetBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className={styles.tweetBtn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default TweetBtn;
