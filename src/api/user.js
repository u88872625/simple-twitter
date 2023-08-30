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

// 取得某使用者資訊
export const getUserInfo = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}`);
    console.log(res.data);
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

// 取得全站使用者資料
export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/admin/users`);
    return res.data;
  } catch (error) {
    console.error("[Get all users Failed]:", error);
  }
};

// 編輯使用者資料
export const patchUserInfo = async (payload, formData) => {
  const {
    id,
    account,
    name,
    email,
    password,
    checkPassword,
    introduction,
    avatar,
    banner,
  } = payload;
  try {
    const res = await axiosInstance.put(
      `${baseUrl}/users/${id}`,
      formData,
      {
        account,
        name,
        email,
        password,
        checkPassword,
        introduction,
        avatar,
        banner,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("[Patch UserIfo Failed]:", error);
    return { success: false, ...error };
  }
};

// 按讚

export const addLike = async (id, token) => {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/tweets/${id}/like`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    console.log(data);
    return data;
  } catch (error) {
    console.error("[Add Like Failed]:", error);
  }
};

// 收回讚

export const unLike = async (id, token) => {
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/tweets/${id}/unlike`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("[Unlike Failed]:", error);
  }
};
