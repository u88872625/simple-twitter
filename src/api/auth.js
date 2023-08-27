import axios from "axios";

const authURL = "https://peaceful-chamber-54211-1de4233804fe.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/signin`, {
      account,
      password,
    });

    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }

    return data;
  } catch (err) {
    console.error("[Login Failed]:", err);

    const errorMessage = err.response?.data.message || "";
    let accountErrMsg = "";
    let passwordErrMsg = "";

    if (errorMessage.includes("User does not exist")) {
      accountErrMsg = "帳號不存在！";
    } else if (errorMessage.includes("Incorrect password")) {
      passwordErrMsg = "不正確的密碼！";
    }
    return {
      success: false,
      cause: {
        accountErrMsg,
        passwordErrMsg,
      },
    };
  }
};

export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });

    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error("[Register Failed]:", error);
    return { success: false, error };
  }
};
