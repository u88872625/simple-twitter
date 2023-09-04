import styles from "./SideBar.module.scss";
import NavItem from "../shared/NavItem/NavItem.jsx";
import TweetBtn from "../shared/shareBtn/TweetBtn.jsx";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import home from "../../assets/icons/home.svg";
import homeActive from "../../assets/icons/home-active.svg";
import userInfoIvon from "../../assets/icons/userInfo.svg";
import userInfoActive from "../../assets/icons/userInfo-active.svg";
import setting from "../../assets/icons/setting.svg";
import settingActive from "../../assets/icons/setting-active.svg";
import logo from "../../assets/icons/logo.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import AddTweetModal from "../Modal/AddTweetModal/AddTweetModal";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import clsx from "clsx";
import { getUserInfo } from "../../api/user";

export default function FontendSideBar() {
  const [activeItem, setActiveItem] = useState("首頁");
  const navigate = useNavigate();
  const { logout, currentUser, addTweet, setIsTweetUpdated } = useAuth();
  const userId = localStorage.getItem("userId");
  const [show, setShow] = useState(false);
  const [tweet, setTweet] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  //  show Modal
  const handleClose = () => setShow(false);
  const handleAddTweet = () => {
    setShow(true);
  };

  // 登出
  const handleItemClick = async (itemName) => {
    console.log("Item clicked: ", itemName); // Debugging line

    // 登出
    if (itemName === "登出") {
      try {
        console.log("Logging out..."); // Debugging line
        await logout();
        console.log("Logged out. Navigating..."); // Debugging line
        navigate("/login");
        console.log("Navigation should have happened."); // Debugging line
      } catch (error) {
        console.error("An error occurred during logout: ", error);
      }
    }

    setActiveItem(itemName);
  };

  // 新增推文
  const handleSubmit = async () => {
    if (tweet.length > 140) return;
    if (tweet.trim().length === 0) return;
    Swal.fire({
      title: "推文中...",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    try {
      const res = await addTweet({ description: tweet });

      setIsUpdating(true);
      Swal.close();
      //若新增推文成功
      if (res) {
        setIsTweetUpdated(true);
        setShow(false);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("[AddTweeet failed ]", error);
      setShow(false);
    }
  };

  // 取得個人資料;
  useEffect(() => {
    if (userId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          // console.log("User Info:", userInfo);
          setUserInfo(userInfo);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserInfoAsync();
    }
  }, [userId]);

  // 監聽路由變化更改isActive屬性 即時更新屬性狀態
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === "/home") {
      setActiveItem("首頁");
    }

    if (
      pathname === "/:account" ||
      pathname.startsWith(`${currentUser?.account}/`)
    ) {
      setActiveItem("個人資料");
    }

    if (pathname === "/settings") {
      setActiveItem("設定");
    }
  }, [location]);

  useEffect(() => {
    setIsTweetUpdated(false);
  }, [setIsTweetUpdated]);

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
              icon={userInfoIvon}
              activeIcon={userInfoActive}
              text="個人資料"
              path={`/${currentUser?.account}`}
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
        avatar={userInfo.avatar}
        onSubmit={handleSubmit}
        onChange={(tweetInput) => {
          setTweet(tweetInput);
        }}
        errorMsg={clsx(
          "",
          { [styles.emptyError]: tweet.trim().length === 0 },
          { [styles.overError]: tweet.length > 140 }
        )}
      />
    </div>
  );
}
