import React, { useState, useEffect } from "react";
import styles from "./AdminLoginPage.module.scss";
import AuthInput from "../../components/AuthInput/AuthInput";
import IconLogo from "../../assets/icons/logo.svg";
import AuthBtn from "../../components/shared/shareBtn/AuthBtn";
import clsx from "clsx";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom/dist";
import { useAuth } from "../../contexts/AuthContext";

const AdminLoginPage = () => {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { adminLogin, currentUser } = useAuth();
  const role = currentUser?.role;
  const handleClick = async () => {
    if (account.trim().length === 0) {
      return;
    }
    if (password.trim().length === 0) {
      return;
    }
    const response = await adminLogin({
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
      if (response.message) {
        setErrorMessage(response.message);
      }
    }
  };

  useEffect(() => {
    if (role === "user") {
      navigate("/main");
    } else if (role === "admin") {
      navigate("/admin/main");
    }
  }, [navigate, role]);

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
            [styles.accountInfoError]: errorMessage.includes(
              "Error: no such user(角色錯誤)"
            ),
          })}
          onChange={(accountInput) => {
            setErrorMessage("");
            setAccount(accountInput);
          }}
        />
        <AuthInput
          label={"密碼"}
          type={"password"}
          value={password}
          placeholder={"請輸入密碼"}
          borderMode={clsx("", {
            [styles.passwordInfoError]: errorMessage.includes(
              "Error: no such user(角色錯誤)"
            ),
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
      <Link to={"/login"}>
        <div className={styles.otherLink}>
          <div className={styles.frontend}>前台登入</div>
        </div>
      </Link>
    </div>
  );
};

export default AdminLoginPage;
