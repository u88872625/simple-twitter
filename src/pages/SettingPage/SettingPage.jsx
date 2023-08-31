import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SettingPage.module.scss";
import clsx from "clsx";
import FontendSettingLayout from "../../components/shared/layout/FontendSettingLayout/FontendSettingLayout";
import AuthSettingInput from "../../components/AuthInput/AuthSettingInput";
import { useAuth } from "../../contexts/AuthContext";
import SettingBtn from "../../components/shared/shareBtn/ReplyBtn";
import { getUserInfo,patchUserInfo } from "../../api/user";
import Alert from "../../components/shared/Alert/Alert";
import successIcon from "../../assets/icons/success.png";
import errorIcon from "../../assets/icons/error.png";
import {useDataUpdate} from '../../contexts/UserDataContext'

const SettingPage = () => {
  const token = localStorage.getItem("token");
  const { currentUser, setEditedUserInfo } = useAuth();
  const userId = currentUser?.id;
  const { isDataUpdate, setIsDataUpdate } = useDataUpdate();
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const passwordMatch = password === checkPassword;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  // const { isAuthenticated } = useAuth();
  const role = currentUser?.role;
  const navigate = useNavigate();
  const [isUserInfoUpdated, setIsUserInfoUpdated] = useState(false);
  // 設一個暫存的Object變數
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    if (userId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          console.log("User Info:", userInfo);
          await setAccount(userInfo.account);
          await setName(userInfo.name);
          await setEmail(userInfo.email);
        } catch (error) {
          console.error(error);
        }
      };
      getUserInfoAsync();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      setShowAlert(false);

      // API的資訊傳遞(需轉換成 Form-data)
      const formData = new FormData();
      //設定key及相對應的value
      for (let key in tempData) {
        formData.append(key, tempData[key]);
      }
      formData.set("account", account);
      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("checkPassword", checkPassword);

      // 檢查對應是否正確
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      const payload = {
        id: userId,
        account:account,
        name: name,
        email:email,
        password:password,
        checkPassword:checkPassword
      };
      const response = await patchUserInfo(payload, formData);

      

      setEditedUserInfo(response);
      console.log("updateUserInfo:", response);

      if (response.success === false) {
        setShowAlert(true);
        setAlertMsg("儲存失敗!");
        return;
      } else {
        setShowAlert(true);
        setAlertMsg("儲存成功!");
        setEditedUserInfo(response);
        setAccount(response.account);
        setName(response.name);
        setEmail(response.email);
        setIsUserInfoUpdated(true);

        console.log("setting", response.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //  驗證token是否存在
  useEffect(() => {
    if (!token && role === "admin") {
      navigate("/login");
    }
  }, [navigate, token, role]);

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
