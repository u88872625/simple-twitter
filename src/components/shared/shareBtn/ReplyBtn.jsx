import React from "react";
import styles from "./_BtnStyle.module.scss";

const ReplyBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className={styles.replyBtn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default ReplyBtn;
