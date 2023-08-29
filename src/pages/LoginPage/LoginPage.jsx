import React, { useState, useEffect } from "react";
import styles from "./LoginPage.module.scss";
import IconLogo from "../../assets/icons/logo.svg";
import AuthInput from "../../components/AuthInput/AuthInput";
import AuthBtn from "../../components/shared/shareBtn/AuthBtn";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom/dist";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  // 後端錯誤訊息判定
  const [accountMsg, setAccountMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.trim().length === 0) {
      return;
    }
    if (password.trim().length === 0) {
      return;
    }

    const response = await login({
      account,
      password,
    });

    const token = response.data.token;
    const userId = response.data.user.id;

    const { success, cause } = response.data;

    if (success) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      // navigate("/Home");
      // 登入成功訊息
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      // 使用後端返回的錯誤訊息來設置前端的錯誤狀態
      if (response.cause) {
        if (response.cause.accountErrMsg) {
          // 這設置一個狀態來保存帳號的錯誤訊息
          setAccountMsg(cause.accountErrMsg);
        }
        if (response.cause.passwordErrMsg) {
          // 設置一個狀態來保存密碼的錯誤訊息
          setPasswordErrorMsg(cause.passwordErrMsg);
        }
      }
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [navigate, isAuthenticated]);

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
            [styles.accountInfoError]: accountMsg.includes("帳號不存在！"),
          })}
          onChange={(accountInput) => {
            setAccountMsg("");
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
              passwordErrorMsg.includes("不正確的密碼！"),
          })}
          onChange={(passwordInput) => {
            setPasswordErrorMsg("");
            setPassword(passwordInput);
          }}
        />
      </div>
      <div className={styles.loginButton}>
        <AuthBtn text={"登入"} onClick={handleClick} />
      </div>
      <div className={styles.otherLink}>
        <Link to={"/signup"}>
          <div className={styles.register}>註冊</div>
        </Link>
        <span className={styles.dot}>．</span>
        <Link to={"/admin"}>
          <div className={styles.admin}>後台登入</div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
