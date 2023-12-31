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
  const { login, isAuthenticated, currentUser } = useAuth();
  const role = currentUser?.role;
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

    // 登入成功
    if (response.success) {
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    }

    // 登入失敗，出現相對應錯誤訊息提示
    if (!response.success) {
      if (response.cause.accountErrMsg) {
        setAccountMsg(response.cause.accountErrMsg);
      }
      if (response.cause.passwordErrMsg) {
        setPasswordErrorMsg(response.cause.passwordErrMsg);
      }
    }
  };
  useEffect(() => {
    if (isAuthenticated && role === "user") {
      navigate("/home");
    }
  }, [navigate, isAuthenticated, role]);

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
