import styles from "./SideBar.module.scss";
import NavItem from "../shared/NavItem/NavItem.jsx";
import TweetBtn from "../shared/shareBtn/TweetBtn.jsx";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import home from "../../assets/icons/home.svg";
import homeActive from "../../assets/icons/home-active.svg";
import userInfo from "../../assets/icons/userInfo.svg";
import userInfoActive from "../../assets/icons/userInfo-active.svg";
import setting from "../../assets/icons/setting.svg";
import settingActive from "../../assets/icons/setting-active.svg";
import logo from "../../assets/icons/logo.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import AddTweetModal from "../Modal/AddTweetModal/AddTweetModal";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

export default function FontendSideBar() {
  const [activeItem, setActiveItem] = useState("首頁");
  const navigate = useNavigate();
  const { logout, currentUser, addTweet } = useAuth();
  const [show, setShow] = useState(false);
  const [tweet, setTweet] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  //  show Modal
  const handleClose = () => setShow(false);
  const handleAddTweet = () => {
    setShow(true);
  };

  const handleItemClick = (itemName) => {
    // 登出
    if (itemName === "登出") {
      logout();
      navigate("/login");
    }

    setActiveItem(itemName);
  };

  const handleSubmit = async () => {
    // 按下推文時跳出loading提示
    Swal.fire({
      title: "推文中...",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    try {
      if (isUpdating) return;
      if (tweet.length > 140) return;
      if (tweet.trim().length < 1) return;
      const res = await addTweet({ description: tweet });

      setIsUpdating(true);

      //若新增推文成功
      if (res) {
        setShow(false);
        setIsUpdating(false);

        // 畫面自動重新整理
        window.location.reload();
      }
    } catch (error) {
      console.error("AddTweeet failed ]", error);
      setShow(false);
    }

    console.log(tweet);
  };

  const location = useLocation();

  // 監聽路由變化更改isActive屬性 即時更新屬性狀態
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === "/home") {
      setActiveItem("首頁");
    }

    if (pathname === "/:account") {
      setActiveItem("個人資料");
    }

    if (pathname === "/settings") {
      setActiveItem("設定");
    }
  }, [location]);

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
              path="/:account"
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
              icon={logoutIcon}
              activeIcon={logoutIcon}
              text="登出"
              isActive={activeItem === "登出"}
              onClick={() => handleItemClick("登出")}
            />
          </ul>
        </div>
      </div>
      <AddTweetModal
        handleClose={handleClose}
        show={show}
        avatar={currentUser?.avatar}
        onSubmit={handleSubmit}
        onChange={(tweetInput) => {
          setTweet(tweetInput);
        }}
      />
    </div>
  );
}
