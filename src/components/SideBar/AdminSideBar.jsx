import styles from "./SideBar.module.scss";
import { useState } from "react";
import NavItem from "../shared/NavItem/NavItem.jsx";
import home from "../../assets/icons/home.svg";
import homeActive from "../../assets/icons/home-active.svg";
import userInfo from "../../assets/icons/userInfo.svg";
import userInfoActive from "../../assets/icons/userInfo-active.svg";
import logout from "../../assets/icons/logout.svg";
import logo from "../../assets/icons/logo.svg";

export default function AdminSideBar() {
  const [activeItem, setActiveItem] = useState("推文清單");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img className={styles.acLogo} src={logo} alt="ac-logo" />
      </div>
      <div className={styles.navItem}>
        <div className={styles.topItems}>
          <ul>
            <NavItem
              icon={home}
              activeIcon={homeActive}
              text="推文清單"
              url="#"
              isActive={activeItem === "推文清單"}
              onClick={() => handleItemClick("推文清單")}
            />
            <NavItem
              icon={userInfo}
              activeIcon={userInfoActive}
              text="使用者列表"
              url="#"
              isActive={activeItem === "使用者列表"}
              onClick={() => handleItemClick("使用者列表")}
            />
          </ul>
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
    </div>
  );
}
