import React from "react";
import styles from "../styles/App.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput/AuthInput";
import AuthBtn from "../components/shared/shareBtn/AuthBtn";
import logo from "../assets/icons/logo.svg";
import clsx from "clsx";

const SignupPage = () => {
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h3 className={styles.title}>建立你的帳號</h3>
      <AuthInput
        label="帳號"
        placeholder="請輸入帳號"
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
      />
      <AuthInput
        label="名稱"
        placeholder="請輸入使用者名稱"
        value={username}
        dataPage={"signUpPage"}
        borderMode={clsx("", {
          [styles.nameError]: username.length > 50,
        })}
        onChange={(nameInputValue) => setUsername(nameInputValue)}
      />
      <AuthInput
        label="Email"
        placeholder="請輸入Email"
        value={email}
        onChange={(emailInputValue) => setEmail(emailInputValue)}
      />
      <AuthInput
        label="密碼"
        placeholder="請設定密碼"
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
      />
      <AuthInput
        label="密碼確認"
        placeholder="請再次輸入密碼"
        value={passwordConfirm}
        onChange={(passwordConfirmInputValue) =>
          setPasswordConfirm(passwordConfirmInputValue)
        }
      />
      <AuthBtn text="註冊" />
      {/* <Link to="/"> */}
      <div className={styles.cancelBtn}>取消</div>
      {/* </Link> */}
    </div>
  );
};

export default SignupPage;
