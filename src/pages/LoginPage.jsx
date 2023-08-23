import { useState } from "react";
import styles from "./LoginPage.module.scss";
import IconLogo from "../assets/icons/logo.svg";
import AuthInput from "../components/AuthInput/AuthInput";
import AuthBtn from "../components/shared/shareBtn/AuthBtn";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  // 後端錯誤訊息判定
  const [errorMessage, setErrorMessage] = useState("");

  // const handleClick = async () => {
  //   // 若帳號或密碼為空，則返回
  //   if (account.trim().length === 0) {
  //     return;
  //   }
  //   if (password.trim().length === 0) {
  //     return;
  //   }
  //
  // const data = await userLogin({
  //   account,
  //   password,
  // });
  // const token = data.data.token;
  //
  // if(data.status==='success'){
  //   localStorage.setItem("authToken", token);

  // 登入成功訊息
  //   Swal.fire({
  //     position: "top",
  //     title: "登入成功！",
  //     timer: 1000,
  //     icon: "success",
  //     showConfirmButton: false,
  //   });
  //   return;
  // }
  //

  //   // 登入失敗
  //   if (data.status==='success') {
  //       setErrorMessage(res.data.message);
  //   }
  // };
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={IconLogo} alt="logo.svg" />
      <h3 className={styles.title}>登入Alphitter</h3>
      <div className={styles.inputWrapper}>
        <AuthInput
          label={"帳號"}
          placeholder={"請輸入帳號"}
          value={account}
          borderMode={clsx(
            { [styles.inputButtomBorder]: !errorMessage },
            {
              [styles.accountInfoError]:
                errorMessage === "[Your fail messages]",
            }
          )}
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
          borderMode={clsx(
            { [styles.inputButtomBorder]: !errorMessage },
            {
              [styles.passwordInfoError]:
                errorMessage === "Error: Incorrect password!",
            }
          )}
          onChange={(passwordInput) => {
            setErrorMessage("");
            setPassword(passwordInput);
          }}
        />
      </div>
      <div className={styles.loginButton}>
        <AuthBtn text={"登入"} />
      </div>
      <div className={styles.otherLink}>
        <Link to="/signup">
          <div className={styles.register}>註冊</div>
        </Link>
        <span className={styles.dot}>．</span>
        <Link to="/admin">
          <div className={styles.admin}>後台登入</div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
