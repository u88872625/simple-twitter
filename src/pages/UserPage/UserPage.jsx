import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getUserInfo, getUserTweet,getUserReplied,getUserLike} from '../../api/user'
import{getTopTweet} from '../../api/tweets'
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
  // const {account} = useParams() //取得用戶account反映在路徑上


  // 追蹤單一貼文點擊
  const handleTweetClick = async(id)=>{
      navigate("/status/${id}");
  }

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
    const userId = localStorage.getItem("userId");
    if (userId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          console.log("User Info:", userInfo); 
          setUserInfo(userInfo);
          setLoading(false); //當取得資料後變回false
        } catch (error) {
          console.error(error);
        } 
      };
      getUserInfoAsync();
    }
  },[])
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const getUserTweetAsync = async () => {
        try {
          const userTweets = await getUserTweet(userId);
          setUserTweets(userTweets);
          setLoading(false); //當取得推文後變回false
        } catch (error) {
          console.error(error);
        }
      };
      getUserTweetAsync();
    }
  }, []);
  useEffect(() =>{
    const userId = localStorage.getItem("userId");
    if (userId) {
      const getUserRepliedAsync = async () => {
      try {
        const userReplied = await getUserReplied(userId);
        setUserReplied(userReplied);
        setLoading(false); //當取得推文後變回false
      } catch (error) {
        console.error(error);
      }
    };
    getUserRepliedAsync();}
    
  },[])
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const getUserLikeAsync = async () => {
        try {
          const userLike = await getUserLike(userId);
          setUserLike(userLike);
          setLoading(false); //當取得推文後變回false
        } catch (error) {
          console.error(error);
        }
      };
      getUserLikeAsync();
    }
    
  }, []);
  //  驗證token是否存在
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login')
      }
    }, [navigate, isAuthenticated]);


  return (
    <FontendLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.header}>
            <img className={styles.arrow} src={arrow} alt="arrow" />
            <div className={styles.text}>
              <h5 className={styles.name}>{userInfo?.name}</h5>
              <span className={styles.sub}>{userTweets.length}推文</span>
            </div>
          </div>
          <div className={styles.infoCard}>
            <UserInfoCard info={userInfo} />
          </div>
          <div className={styles.tabs}>
            <TweetTabs
              tweets={userTweets}
              replies={userReplied}
              likes={userLike}
              onClick={handleLikeClick}
              onTweetClick={handleTweetClick}
            />
          </div>
        </>
      )}
    </FontendLayout>
  );
};
export default UserPage;