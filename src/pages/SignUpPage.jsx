import React from "react";
import styles from "../styles/App.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput/AuthInput";
import AuthBtn from "../components/shared/shareBtn/AuthBtn";
import logo from "../assets/icons/logo.svg";
import error from "../assets/icons/error.png"
import clsx from "clsx";
import {register} from '../api/auth.js'
import Alert from '../components/shared/Alert/Alert'
import Swal from 'sweetalert2'

const SignupPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const passwordMatch = password === checkPassword;
  const [showErrMsg, setShowErrMsg] = useState(null)
  // const [showEmptyErr, setShowEmptyErr] = useState(false)

  const handleClick = async () =>{
    // 清除先前的錯誤狀態
    setShowErrMsg(null);

    // // 檢查空格
    // if (
    //   account.length === 0 ||
    //   name.length === 0 ||
    //   email.length === 0 ||
    //   password.length === 0 ||
    //   checkPassword.length === 0
    // ) {
    //   setShowEmptyErr(true)
    //   // return;
    // }
    
    // // 清除先前錯誤狀態
    // setShowEmptyErr(false)

    const { success, token, error } = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    });

    if (success) {
      localStorage.setItem("token", token);
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
      const { cause } = error.response.data;
      const errMsg = [];

      // 取得cause物件返回的屬性名及其值
      for (const key in cause) {
        if (cause[key]) {
          errMsg.push(cause[key]);
        }
      }

      setShowErrMsg(errMsg.join(" "));
    }
  }
    
    
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
      <AuthBtn text="註冊" onClick={handleClick} />
      <Link to="/login">
        <div className={styles.cancelBtn}>取消</div>
      </Link>
      {/* {showEmptyErr ? <Alert msg={showEmptyErr} icon="error" /> : ""} */}
      {showErrMsg ? <Alert msg={showErrMsg} icon={error} /> : ""}
    </div>
  );
};

export default SignupPage;
