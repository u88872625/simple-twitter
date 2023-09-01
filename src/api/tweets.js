import axios from "axios";

const baseUrl = "https://peaceful-chamber-54211-1de4233804fe.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Authorization header added:", `Bearer ${token}`);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// 後台所有貼文
export const getAdminAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/admin/tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get Admin AllTweets Failed]:", error);
  }
};

// 後台刪除一筆貼文
export const deleteTweet = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/admin/tweets/${id}`);
    return res.data;
  } catch (error) {
    console.error("[Deleete Tweet Failed]:", error);
  }
};

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
export const getTopTweet = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get TopTweet failed]: ", error);
  }
};

// 單一貼文的所有回覆
export const getTopTweetReplies = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${id}/replies`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get TopTweetReplies failed]: ", error);
  }
};

// 追蹤
export const userFollow = async (token, id) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/followships`,
      { id },
      { headers: { Authorization: "Bearer " + token } }
    );
    return data;
  } catch (error) {
    console.error("[userFollow failed]", error);
  }
};
// 取消追蹤
export const unFollow = async (token, id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/followships/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return data;
  } catch (error) {
    console.error("[UnFollow failed]", error);
  }
};

// / get某位使用者的 followers 資料
export const getUserFollowers = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followers`);
    return res.data;
  } catch (error) {
    console.error("[Get user followers failed]", error);
  }
};

// get某位使用者的 followings 資料
export const getUserFollowings = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followings`);

    return res.data;
  } catch (error) {
    console.error("[Get user followings failed]", error);
  }
};

// 回覆一則推文
export const replyTweet = async (id, { comment }) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${id}/replies`, {
      comment,
    });
    return res;
  } catch (error) {
    console.error("[ReplyTweet failed]", error);
  }
};
