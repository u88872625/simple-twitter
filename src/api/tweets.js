import axios from "axios";

const baseUrl = "https://peaceful-chamber-54211-1de4233804fe.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// 拿取所有貼文
export const getAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get AllTweets failed]: ", error);
  }
};

// Top10 追蹤者的帳號
export const getTopUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users`);
    return res.data;
  } catch (error) {
    console.error("[Get TopUserfollowers failed]", error);
  }
};

// 發布一則推文
export const addTweet = async ({ description }) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets`, {
      description,
    });
    return res.data;
  } catch (error) {
    console.error("[Add Tweet failed]: ", error);
  }
};

// 單一貼文
export const getTopTweet = async(id)=>{
  try{
    const res = await axios.get(`${baseUrl}/tweets/${id}`)
    return res.data
  }catch (error){
    console.error("[Get TopTweet failed]: ", error)
  }
}

// 單一貼文的所有回覆
export const getTopTweetReplies = async(id)=>{
  try{
    const res= await axios.get(`${baseUrl}/tweets/${id}/replies`)
    return res.data
  }catch(error){
    console.error("[Get TopTweetReplies failed]: ", error);
  }
}