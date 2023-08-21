import React from "react";
import styles from "./AuthInput.module.scss";

const AuthInput = ({ label, type, placeholder, value, onChange, dataPage }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      ></input>
      <div className={styles.inputButtomBorder}></div>
    </div>
  );
};

export default AuthInput;
