import React from "react";
import styles from "./_BtnStyle.module.scss";

const FollowingBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className={styles.followingBtn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default FollowingBtn;
