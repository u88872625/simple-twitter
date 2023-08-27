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
export const getUserInfo = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/:id`);

    return res.data;
  } catch (error) {
    console.error("[Get UerInfo Failed]:", error);
  }
};

// 取得某使用者的所有貼文
export const getUserTweet = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/:id/tweets`);

    return res.data;
  } catch (error) {
    console.error("[Get UerTweet Failed]:", error);
  }
};

// 取得某使用者的所有回覆
export const getUserReplied = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/:id/replied_tweets`);

    return res.data;
  } catch (error) {
    console.error("[Get UerReplied Failed]:", error);
  }
};

// 取得某使用者的所有喜歡的貼文
export const getUserLike = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/:id/likes`);

    return res.data;
  } catch (error) {
    console.error("[Get UerLike Failed]:", error);
  }
};
