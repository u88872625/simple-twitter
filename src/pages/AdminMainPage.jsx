import React, { useEffect, useState } from "react";
import AdminLayout from '../components/shared/layout/AdminLayout/AdminLayout'
import { useAuth } from "../contexts/AuthContext";
import{ getAdminAllTweets,deleteTweet } from '../api/tweets'
import AdminMain from '../components/Admin/AdminMain/AdminMain'
import {Modal,Button} from 'react-bootstrap'


const AdminMainPage = () => {
 const { currentUser } = useAuth();
 const role = currentUser?.role;
 const [tweets, setTweets] = useState([])
 const [showModal, setShowModal]=useState(false)
 const [tweetToDelete, setTweetToDelete]=useState(null)

 const openModal = (id)=>{
  setShowModal(true)
  console.log('todelete',id)
  setTweetToDelete(id)
 }

 const closeModal=()=>{
  setShowModal(false)
  setTweetToDelete(null)
 }

 const handleDelete = async(id) => {
    try {
      await deleteTweet(id);
      setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== id));
      setShowModal(false);
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
        <AdminMain tweets={tweets} onClick={openModal} onDelete={(id)=>openModal?.(id)}
      />) : (
        <div>Loading...</div>
      )}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>確定要刪除這則貼文嗎？</Modal.Body>
         <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            取消
          </Button>
          <Button variant="danger" onClick={() => handleDelete(tweetToDelete)}>
            確定
          </Button>
          </Modal.Footer>

      </Modal>
    </AdminLayout>
  );
};

export default AdminMainPage;
