import styles from "./SideBar.module.scss";
import NavItem from "../shared/NavItem/NavItem.jsx";
import TweetBtn from "../shared/shareBtn/TweetBtn.jsx";
import { useState } from "react";
import home from "../../assets/icons/home.svg";
import homeActive from "../../assets/icons/home-active.svg";
import userInfo from "../../assets/icons/userInfo.svg";
import userInfoActive from "../../assets/icons/userInfo-active.svg";
import setting from "../../assets/icons/setting.svg";
import settingActive from "../../assets/icons/setting-active.svg";
import logo from "../../assets/icons/logo.svg";
import logout from "../../assets/icons/logout.svg";
import AddTweetModal from "../Modal/AddTweetModal/AddTweetModal";

export default function FontendSideBar() {
  const [activeItem, setActiveItem] = useState("首頁");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleAddTweet = () => {
    setShow(true);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

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
              url="#"
              isActive={activeItem === "首頁"}
              onClick={() => handleItemClick("首頁")}
            />
            <NavItem
              icon={userInfo}
              activeIcon={userInfoActive}
              text="個人資料"
              url="#"
              isActive={activeItem === "個人資料"}
              onClick={() => handleItemClick("個人資料")}
            />
            <NavItem
              icon={setting}
              activeIcon={settingActive}
              text="設定"
              url="#"
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
              url="#"
              isActive={activeItem === "登出"}
              onClick={() => handleItemClick("登出")}
            />
          </ul>
        </div>
      </div>
      <AddTweetModal handleClose={handleClose} show={show} />
    </div>
  );
}
