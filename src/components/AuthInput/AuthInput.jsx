import React from "react";
import styles from "./AuthInput.module.scss";
import { useState } from "react";

const AuthInput = ({ label, type, placeholder, value, onChange, dataPage }) => {
  const [charCount, setCharCount] = useState(value.length);
  const maxChar = 50;
  const isCharCountExceeded = charCount > maxChar;

  const handleInputChange = (inputValue) => {
    onChange?.(inputValue);
    setCharCount(inputValue.length);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${isCharCountExceeded ? styles.err : ""}`}
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e.target.value)}
      ></input>
      <div
        className={styles.inputButtomBorder}
      ></div>
      <div className={styles.charCount}>
        {charCount}/{maxChar}
      </div>
      {isCharCountExceeded && (
        <div className={styles.errorMsg}>
          <p>字數超出上限！</p>
        </div>
      )}
    </div>
  );
};

export default AuthInput;
