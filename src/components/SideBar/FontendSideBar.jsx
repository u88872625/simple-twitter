import styles from "./SideBar.module.scss";
import NavItem from "../shared/NavItem/NavItem.jsx";
import TweetBtn from "../shared/shareBtn/TweetBtn.jsx";
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import home from "../../assets/icons/home.svg";
import homeActive from "../../assets/icons/home-active.svg";
import userInfo from "../../assets/icons/userInfo.svg";
import userInfoActive from "../../assets/icons/userInfo-active.svg";
import setting from "../../assets/icons/setting.svg";
import settingActive from "../../assets/icons/setting-active.svg";
import logo from "../../assets/icons/logo.svg";
import logout from "../../assets/icons/logout.svg";

export default function FontendSideBar() {
  const [activeItem, setActiveItem] = useState("首頁");
  const location = useLocation()

  // 監聽路由變化更改isActive屬性 即時更新屬性狀態
  useEffect(()=>{
    const pathname = location.pathname

    if(pathname === '/home'){
      setActiveItem('首頁')
    }

    if(pathname==='/:username'){
      setActiveItem("個人資料");
    }

    if(pathname ==='/settings'){
      setActiveItem('設定')
    }
  },[location])

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const handleAddTweet = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img className="acLogo" src={logo} alt="ac-logo" />
      </div>
      <div className={styles.navItem}>
        <div className={styles.topItems}>
          <ul>
            <NavItem
              icon={home}
              activeIcon={homeActive}
              text="首頁"
              path="/home"
              isActive={activeItem === "首頁"}
              onClick={() => handleItemClick("首頁")}
            />
            <NavItem
              icon={userInfo}
              activeIcon={userInfoActive}
              text="個人資料"
              path="/:username"
              isActive={activeItem === "個人資料"}
              onClick={() => handleItemClick("個人資料")}
            />
            <NavItem
              icon={setting}
              activeIcon={settingActive}
              text="設定"
              path="/settings"
              isActive={activeItem === "設定"}
              onClick={() => handleItemClick("設定")}
            />
          </ul>
          <TweetBtn text="推文" onClick={handleAddTweet} />
        </div>
        <div className={styles.bottomItem}>
          <ul>
            <NavItem
              icon={logout}
              activeIcon={logout}
              text="登出"
              path="/"
              isActive={activeItem === "登出"}
              onClick={() => handleItemClick("登出")}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
