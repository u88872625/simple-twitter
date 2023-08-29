import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SettingPage.module.scss";
import clsx from "clsx";
import FontendSettingLayout from "../../components/shared/layout/FontendSettingLayout/FontendSettingLayout";
import AuthSettingInput from "../../components/AuthInput/AuthSettingInput";
import { useAuth } from "../../contexts/AuthContext";
import SettingBtn from "../../components/shared/shareBtn/ReplyBtn";
import { patchUserInfo } from "../../api/user";
import Alert from "../../components/shared/Alert/Alert";
import successIcon from "../../assets/icons/success.png";
import errorIcon from "../../assets/icons/error.png";

const SettingPage = () => {
  const { currentUser, setEditedUserInfo } = useAuth();
  const [account, setAccount] = useState(currentUser?.account || "");
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const passwordMatch = password === checkPassword;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlerMsg] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const editedInfo = {
        id: currentUser.id,
        account,
        name,
        email,
        password,
        checkPassword,
      };
      const updateUserInfo = await patchUserInfo(editedInfo);
      setEditedUserInfo(updateUserInfo);

      if (updateUserInfo.success) {
        setShowAlert(true);
        setAlerMsg("儲存成功!");
      } else {
        setShowAlert(true);
        setAlerMsg(updateUserInfo.message || "儲存失敗!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //  驗證token是否存在
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <FontendSettingLayout>
      <div className={styles.header}>
        <h4 className={styles.title}>帳戶設定</h4>
      </div>
      <div className={styles.input}>
        <AuthSettingInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <AuthSettingInput
          label="名稱"
          placeholder="請輸入使用者名稱"
          value={name}
          dataPage={"settingPage"}
          borderMode={clsx("", {
            [styles.nameError]: name.length > 50,
          })}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
        <AuthSettingInput
          label="Email"
          placeholder="請輸入Email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
        <AuthSettingInput
          label="密碼"
          placeholder="請設定密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        <AuthSettingInput
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
        <div className={styles.btn}>
          <SettingBtn text="儲存" onClick={handleSave} />
        </div>
        {showAlert && (
          <Alert
            msg={alertMsg}
            icon={alertMsg === "儲存成功!" ? successIcon : errorIcon}
          />
        )}
      </div>
    </FontendSettingLayout>
  );
};

export default SettingPage;
