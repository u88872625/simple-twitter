import React, { useEffect, useState } from "react";
import AdminLayout from '../components/shared/layout/AdminLayout/AdminLayout'
import { useAuth } from "../contexts/AuthContext";
import{ getAdminAllTweets,deleteTweet } from '../api/tweets'
import AdminMain from '../components/Admin/AdminMain/AdminMain'

const AdminMainPage = () => {
 const { currentUser } = useAuth();
 const role = currentUser?.role;
 const [tweets, setTweets] = useState([])

 const handleDelete = async(id) => {
   try {
    await deleteTweet(id)
    setTweets((prevTweets)=>prevTweets.filter((tweet)=>tweet.id !== id))
   } catch (error) {
     console.error(error);
   }
 };

 useEffect(()=>{
  const getAdminAllTweetsAsync = async()=>{
    try{
      const allTweets = await getAdminAllTweets()
      setTweets(allTweets)
      console.log('adminmain',allTweets)
    }catch(error){
      console.error(error)
    }
  }
  getAdminAllTweetsAsync()
 },[])
  return (
    <AdminLayout>
      {tweets.length > 0 ? (
        <AdminMain tweets={tweets} onClick={(id)=>handleDelete?.(id)} />
      ) : (
        <div>Loading...</div>
      )}
    </AdminLayout>
  );
};

export default AdminMainPage;
