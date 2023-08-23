import React from "react";
import styles from "./_BtnStyle.module.scss";

const FollowBtn = ({ text, onClick }) => {
  return (
    <div>
      <div>
        <button className={styles.followBtn} onClick={onClick}>
          {text}
        </button>
      </div>
    </div>
  );
};

export default FollowBtn;
