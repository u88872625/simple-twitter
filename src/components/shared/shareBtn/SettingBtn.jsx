import React from "react";
import styles from "./_BtnStyle.module.scss";

const SettingBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className={styles.settingBtn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default SettingBtn;
