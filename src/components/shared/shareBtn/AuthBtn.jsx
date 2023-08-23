import React from "react";
import styles from './_BtnStyle.module.scss'

const AuthBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className={styles.authBtn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default AuthBtn;
