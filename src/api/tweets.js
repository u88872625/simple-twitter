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

// 追蹤
export const userFollow = async (id) => {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/followships`, {
      id,
    });
    return data;
  } catch (error) {
    console.error("[User Follow failed]: ", error);
  }
};

// 取消追蹤
export const unFollow = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`${baseUrl}/followships/${id}`);
    return data;
  } catch (error) {
    console.error("[UnFollow failed]: ", error);
  }
};
