import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import IconLogo from "../assets/icons/logo.svg";
import AuthInput from "../components/AuthInput/AuthInput";
import AuthBtn from "../components/shared/shareBtn/AuthBtn";
import clsx from "clsx";
import Swal from "sweetalert2";
import { login } from "../api/auth";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  // 後端錯誤訊息判定
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    if (account.trim().length === 0) {
      return;
    }
    if (password.trim().length === 0) {
      return;
    }

    const { success, token } = await login({
      account,
      password,
    });
    if (success) {
      localStorage.setItem("token", token);
    }
    Swal.fire({
      title: "登入失敗",
      icon: "error",
      showConfirmButton: false,
      timer: 1000,
      position: "top",
    });
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={IconLogo} alt="logo.svg" />
      <h3 className={styles.title}>登入Alphitter</h3>
      <div className={styles.inputWrapper}>
        <AuthInput
          label={"帳號"}
          placeholder={"請輸入帳號"}
          value={account}
          borderMode={clsx("", {
            [styles.accountInfoError]:
              errorMessage === "Error: Incorrect password!",
          })}
          onChange={(accountInput) => {
            setErrorMessage("");
            setAccount(accountInput);
          }}
        />
        <AuthInput
          label={"密碼"}
          placeholder={"請輸入密碼"}
          type={"password"}
          value={password}
          borderMode={clsx("", {
            [styles.passwordInfoError]:
              errorMessage === "Error: Incorrect password!",
          })}
          onChange={(passwordInput) => {
            setErrorMessage("");
            setPassword(passwordInput);
          }}
        />
      </div>
      <div className={styles.loginButton}>
        <AuthBtn text={"登入"} onClick={handleClick} />
      </div>
      <div className={styles.otherLink}>
        <div className={styles.register}>註冊</div>
        <span className={styles.dot}>．</span>
        <div className={styles.admin}>後台登入</div>
      </div>
    </div>
  );
};

export default LoginPage;
