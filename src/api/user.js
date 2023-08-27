import axios from "axios";

const baseUrl = "https://peaceful-chamber-54211-1de4233804fe.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// 取得某使用者資訊
export const getUserInfo = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}`);
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.error("[Get UerInfo Failed]:", error);
  }
};

// 取得某使用者的所有貼文
export const getUserTweet = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/tweets`);
console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get UerTweet Failed]:", error);
  }
};

// 取得某使用者的所有回覆
export const getUserReplied = async (userId) => {
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/users/${userId}/replied_tweets`
    );
console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get UerReplied Failed]:", error);
  }
};

// 取得某使用者的所有喜歡的貼文
export const getUserLike = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/likes`);
console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get UerLike Failed]:", error);
  }
};
