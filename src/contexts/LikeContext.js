import { createContext, useContext, useState } from "react";
import { addLike, unLike } from "../api/user";

const LikeContext = createContext();

export const useLike = () => useContext(LikeContext);

export function LikeContexProvider({ children }) {
	const [likedTweetId, setLikeTweetId]=useState(null)
	const [likeCount, setLikeCount]=useState(null)
	const token = localStorage.getItem('token')

	// 按讚
	const addLikeAsync = async (id, token)=>{
		try{
			const res = await addLike(id,token)
			setLikeTweetId(id)
			setLikeCount((prevCount) => prevCount + 1);
			console.log('likecontext:',res)
		}catch(error){
			console.error(error)
		}
	}

	// 收回讚
	const unLikeAsync = async (id, token)=>{
		try{
			const res = await unLike(id,token)
			setLikeTweetId(id)
			setLikeCount((prevCount)=>prevCount - 1)
			console.log("likecontext:", res);
		}catch(error){
			console.error(error)	
		}
	}

	// 追蹤按讚或收回讚
	const handleLikeClick = async(id, isLiked)=>{
		if(isLiked){
			await unLike(id,token)
		} else {
			await addLike(id,token)
		}
	}



  return (
    <LikeContext.Provider
      value={{
        likedTweetId,
        setLikeTweetId,
				likeCount,
				setLikeCount,
				addLikeAsync,
        unLikeAsync,
        handleLikeClick,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
}
