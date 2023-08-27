import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUserInfo, getUserTweet,getUserReplied,getUserLike} from '../../api/user'
import {useAuth} from '../../contexts/AuthContext'
import styles from "./UserPage.module.scss";
import FontendLayout from "../../components/shared/layout/FontendLayout/FontendLayout.jsx"
import UserInfoCard from "../../components/InfoCard/UserInfoCard";
import TweetTabs from "../../components/TweetTabs/TweetTabs";
import arrow from "../../assets/icons/back.svg";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState()
  const [userTweets, setUserTweets] = useState([]);
  const [userReplied, setUserReplied] = useState([])
  const [userLike, setUserLike] = useState([]) 
   // 確保先取得userTweets再渲染TweetTabs
  const [loading, setLoading] = useState(true)
  const {isAuthenticated} = useAuth()
  const navigate=useNavigate()
  // 更新對應推文的like數 後續需要把變動傳回後端
  const handleLikeClick = (tweetId) => {
    const newTweet = userTweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          isLike: !tweet.isLiked,
          likesNum: tweet.isLiked ? tweet.likesNum - 1 : tweet.likesNum + 1,
        };
      }
      return tweet;
    });
    setUserTweets(newTweet)
  };
  useEffect(()=>{
    const getUserInfoAsync = async()=>{
      try {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
        setLoading(false) //當取得資料後變回false
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfoAsync()
  },[])
  useEffect(() => {
    const getUserTweetAsync = async () => {
      try {
        const userTweets = await getUserTweet();
        setUserTweets(userTweets);
        setLoading(false) //當取得推文後變回false
      } catch (error) {
        console.error(error);
      }
    };
    getUserTweetAsync();
  }, []);
  useEffect(() =>{
    const getUserRepliedAsync = async () =>{
      try {
        const userReplied = await getUserReplied();
        setUserReplied(userReplied);
        setLoading(false) //當取得推文後變回false
      } catch (error) {
        console.error(error);
      }
    };
    getUserRepliedAsync();
  },[])
  useEffect(() => {
    const getUserLikeAsync = async () => {
      try {
        const userLike = await getUserLike();
        setUserLike(userLike);
        setLoading(false); //當取得推文後變回false
      } catch (error) {
        console.error(error);
      }
    };
    getUserLikeAsync();
  }, []);
  // // 驗證token是否存在
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login')
      }
    }, [navigate, isAuthenticated]);
  return (
    // <fragment>
    <FontendLayout>
      <div className={styles.header}>
        <img className={styles.arrow} src={arrow} alt="arrow" />
        <div className={styles.text}>
          <h5 className={styles.name}>John Doe</h5>
          <span className={styles.sub}>25推文</span>
        </div>
      </div>
      <div className={styles.infoCard}>
        <UserInfoCard info={userInfo}/>
      </div>
      <div className={styles.tabs}>
        {!loading && (
          <TweetTabs
            tweets={userTweets}
            replies={userReplied}
            likes={userLike}
            onClick={handleLikeClick}
          />
        )}
      </div>
    </FontendLayout>
    // </fragment>
  );
};
export default UserPage;