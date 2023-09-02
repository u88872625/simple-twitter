import React, { useEffect } from "react";
import styles from "../styles/App.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput/AuthInput";
import AuthBtn from "../components/shared/shareBtn/AuthBtn";
import logo from "../assets/icons/logo.svg";
import error from "../assets/icons/error.png";
import clsx from "clsx";
import { useAuth } from "../contexts/AuthContext";
import Alert from "../components/shared/Alert/Alert";
import Swal from "sweetalert2";

const SignupPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const passwordMatch = password === checkPassword;
  const [showErrMsg, setShowErrMsg] = useState(false);

  const navigate = useNavigate();

  const { register, isAuthenticated } = useAuth();

  const handleSignUpClick = async () => {
    // 清除先前的錯誤狀態
    setShowErrMsg(null);

    const loadingAlert = Swal.fire({
      title: "正在註冊...",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    
    // success, token, id, error;
    const response = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    });

    loadingAlert.close();

    const { success } = response;
    if (success) {
      Swal.fire({
        title: "註冊成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      return;
    }

    if (!success) {
      if (response.accountErrMsg) {
        setShowErrMsg(response.accountErrMsg);
      }
      if (response.nameErrMsg) {
        setShowErrMsg(response.nameErrMsg);
      }
      if (response.emailErrMsg) {
        setShowErrMsg(response.emailErrMsg);
      }
      if (response.passwordErrMsg) {
        setShowErrMsg(response.passwordErrMsg);
      }
      if (response.checkPasswordErrMsg) {
        setShowErrMsg(response.checkPasswordErrMsg);
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
        value={name}
        dataPage={"signUpPage"}
        borderMode={clsx("", {
          [styles.nameError]: name.length > 50,
        })}
        onChange={(nameInputValue) => setName(nameInputValue)}
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
        value={checkPassword}
        borderMode={clsx("", {
          [styles.passwordError]: !passwordMatch,
        })}
        onChange={(checkPasswordInputValue) =>
          setCheckPassword(checkPasswordInputValue)
        }
      />
      <AuthBtn text="註冊" onClick={handleSignUpClick} />
      <Link to="/login">
        <div className={styles.cancelBtn}>取消</div>
      </Link>
      {showErrMsg ? <Alert msg={showErrMsg} icon={error} /> : ""}
    </div>
  );
};

export default SignupPage;
