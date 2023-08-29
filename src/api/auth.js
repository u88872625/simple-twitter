import axios from "axios";

const authURL = "https://peaceful-chamber-54211-1de4233804fe.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/signin`, {
      account,
      password,
    });

    if (data.success) {
      return { success: true, ...data };
    } else {
      return { success: false, ...data };
    }
  } catch (error) {
    console.error("[Login Failed]:", error);
    return error.response?.data || { message: "登入失敗", success: false };
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

    if (error.response?.data?.cause) {
      const { cause: causeData } = error.response.data;
      return {
        success: false,
        ...causeData,
      };
    } else {
      return { success: false };
    }
  }
};
