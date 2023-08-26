import React, { useState } from "react";
import styles from "./AdminLoginPage.module.scss";
import AuthInput from "../../components/AuthInput/AuthInput";
import IconLogo from "../../assets/icons/logo.svg";
import AuthBtn from "../../components/shared/shareBtn/AuthBtn";
import clsx from "clsx";
import Swal from "sweetalert2";
import { Link } from "react-router-dom/dist";

const AdminLoginPage = () => {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={IconLogo} alt="logo.svg" />
      <h3 className={styles.title}>後台登入</h3>
      <div className={styles.inputWrapper}>
        <AuthInput
          label={"帳號"}
          value={account}
          placeholder={"請輸入帳號"}
          borderMode={clsx("", {
            [styles.accountInfoError]: errorMessage.includes("帳號不存在！"),
          })}
          onChange={(accountInput) => {
            setErrorMessage("");
            setAccount(accountInput);
          }}
        />
        <AuthInput
          label={"密碼"}
          value={password}
          placeholder={"請輸入密碼"}
          borderMode={clsx("", {
            [styles.passwordInfoError]: errorMessage.includes("不正確的密碼！"),
          })}
          onChange={(passwordInput) => {
            setErrorMessage("");
            setPassword(passwordInput);
          }}
        />
      </div>
      <div className={styles.loginButton}>
        <AuthBtn text={"登入"} />
      </div>
      <Link to={"/login"}>
        <div className={styles.otherLink}>
          <div className={styles.frontend}>前台登入</div>
        </div>
      </Link>
    </div>
  );
};

export default AdminLoginPage;
