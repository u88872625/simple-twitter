import styles from "./UserInfoCard.module.scss";
// import { useNavigate} from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import SettingBtn from "../shared/shareBtn/SettingBtn";
import ProfileEditModal from "../Modal/ProfileEditModal/ProfileEditModal";
import { useState, useEffect } from "react"
import defaultAvatar from "../../assets/icons/default-img.svg";
import defaultBanner from "../../assets/images/bg-user.png";
import { Link } from "react-router-dom";
import DefaultBanner from "../../assets/images/bg-user.png";
import DefaultAvatar from "../../assets/icons/default-img.svg";
import Alert from "../shared/Alert/Alert";
import warning from "../../assets/icons/warning.png";
import success from "../../assets/icons/success.png";
import { getUserInfo } from "../../api/user";

export default function UserInfoCard({ info, handleFollowDetail }) {

  const { currentUser, patchUserInfo, setIsEditedUserInfo, updateUserInfo } =
    useAuth();
  const [show, setShow] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [introduction, setIntroduction] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(currentUser?.banner || null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  // 設一個暫存的Object變數
  const [tempData, setTempData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlerMsg] = useState(false);
  const userId = currentUser?.id;

  const handleClose = () => setShow(false);

  const handleEditModalOpen = () => {
    setShow(true);
  };

  const [showMore, setShowMore] = useState(false);
  const maxChars = 70
  // 如果文字長度超過 maxChars，則將其截斷並提供 "查看更多" 功能
  const truncatedText = showMore
    ? introduction
    : introduction.slice(0, maxChars);
 

  //  變更頭像
  const handleChangeAvatar = (e) => {
    // 選取fileList裡的第一個文件更新狀態
    setAvatar(e.target.files[0]);
    // 預覽選取的頭像
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  // 變更背景
  const handleChangeBanner = (e) => {
    // 選取fileList裡的第一個文件更新狀態
    setBanner(e.target.files[0]);
    // 預覽選取的banner
    setBannerPreview(URL.createObjectURL(e.target.files[0]));
  };

  // 點擊儲存button
  const handleSave = async () => {
    try {
      setAvatarPreview(null);
      setBannerPreview(null);
      // 若input空值，則返回
      if (name.trim().length === 0) return;
      // 若自我介紹或是名字長度超過限制，則返回
      if (name.length > 50 || introduction.length > 160) return;
      // API的資訊傳遞(需轉換成 Form-data)
      const formData = new FormData();
      //設定key及相對應的value
      for (let key in tempData) {
        formData.append(key, tempData[key]);
      }
      formData.set("name", name);
      formData.set("introduction", introduction);
      formData.set("avatar", avatar);
      formData.set("banner", banner);

      // 檢查對應是否正確
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      const payload = {
        id: userId,
        name: name,
        introduction: introduction,
        avatar: avatar,
        banner: banner,
      };
      const response = await patchUserInfo(payload, formData);

      // 若成功把使用者編輯資料送出

      if (response.id) {
        console.log("Successupdated", response);
        updateUserInfo(response);
        setShowAlert(true)
        setShow(false);
        window.location.reload();
      }
      // 若使用者編輯資料失敗
      else {
        setAlerMsg(true)
        setShow(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBannerDelete = () => {
    setBanner(null);
    setBannerPreview(null);

    const formData = new FormData();
    formData.delete("banner");
    setTempData((prevData) => ({ ...prevData, banner: null }));
  };

  useEffect(() => {
    const getUserInfoAsync = async () => {
      const userInfo = await getUserInfo(userId);
      updateUserInfo(userInfo);
      setTempData(userInfo);
      setName(userInfo.name);
      setIntroduction(userInfo.introduction);
      setAvatar(userInfo.avatar);
      setBanner(userInfo.banner);
    };
    getUserInfoAsync();
    setIsEditedUserInfo(false);
  }, [getUserInfo, userId, setIsEditedUserInfo]);

  if (!info) {
    return <div>Loading...</div>;
  }

  console.log('uerinfocard:',info)
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          className={styles.banner}
          src={
            tempData
              ? tempData.banner
                ? tempData.banner
                : info.banner
              : info.banner
              ? info.banner
              : DefaultBanner
          }
          alt="banner"
        />

        <img
          className={styles.avatar}
          src={
            tempData
              ? tempData.avatar
                ? tempData.avatar
                : info.avatar
              : info.avatar
              ? info.avatar
              : DefaultAvatar
          }
          alt="avatar"
        />

        <div className={styles.editBtn}>
          <SettingBtn text="編輯個人資料" onClick={handleEditModalOpen} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <h5 className={styles.userName}>{info.name}</h5>
        <p className={styles.userAccount}>@{info.account}</p>
      </div>
      <div className={styles.introduction}>
        <p>{truncatedText}</p>
        {introduction.length > maxChars && !showMore && (
          <button className={styles.viewMore} onClick={() => setShowMore(true)}>查看更多</button>
        )}
      </div>

      <div className={styles.showFollow} onClick={handleFollowDetail}>
        <p className={styles.showfolloing}>
          {info.followingsNum}個<span className={styles.sub}>跟隨中</span>
        </p>
        <p className={styles.showfollowers}>
          {info.followersNum}位<span className={styles.sub}>跟隨者</span>
        </p>
        {showAlert ? <Alert msg="上傳成功" icon={success} /> : ""}
        {alertMsg ? <Alert msg="上傳失敗" icon={warning} /> : ""}
      </div>

      <ProfileEditModal
        show={show}
        handleClose={handleClose}
        handleSave={handleSave}
        handleChangeAvatar={handleChangeAvatar}
        handleChangeBanner={handleChangeBanner}
        name={name}
        introduction={introduction}
        onNameChange={(nameInput) => setName(nameInput)}
        onIntroChange={(introInput) => setIntroduction(introInput)}
        handleBannerDelete={handleBannerDelete}
        avatar={
          avatarPreview
            ? avatarPreview
            : tempData
            ? tempData.avatar
              ? tempData.avatar
              : DefaultAvatar
            : currentUser.avatar
            ? currentUser.avatar
            : DefaultAvatar
        }
        banner={
          bannerPreview
            ? bannerPreview
            : tempData
            ? tempData.banner
              ? tempData.banner
              : currentUser.banner
            : currentUser.banner
            ? currentUser.banner
            : DefaultBanner
        }
      />
    </div>
  );
}
