import React from "react";
import styles from "./AuthSettingInput.module.scss";
import { useState } from "react";
import clsx from "clsx";

const AuthInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  dataPage,
  borderMode,
  inputStyle,
}) => {
  const [charCount, setCharCount] = useState(value ? value.length : 0);
  let maxChar = 0;

  if (
    dataPage &&
    (dataPage === "signUpPage" || dataPage === "profileEditModal")
  ) {
    if (label === "名稱") {
      maxChar = 50;
    } else if (label === "自我介紹") {
      maxChar = 160;
    }
  } else {
    maxChar = null;
  }

  const handleInputChange = (inputValue) => {
    onChange?.(inputValue);
    setCharCount(inputValue.length);
  };

  return (
    <div className={clsx(styles.inputContainer, inputStyle)}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e.target.value)}
      ></input>
      <div className={clsx(styles.inputButtomBorder, borderMode)}></div>
      {maxChar && (
        <div className={styles.charCount}>
          {charCount}/{maxChar}
        </div>
      )}
    </div>
  );
};

export default AuthInput;
