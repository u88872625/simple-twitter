import axios from "axios";

const authURL = "https://peaceful-chamber-54211-1de4233804fe.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
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
    return { success: false };
  }
};

export const register = async ({ account, name, email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/signin`, {
      account,
      name,
      email,
      password,
    });
    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }

    return data;
  } catch (err) {
    console.error("[Register Failed]:", err);
    return { success: false };
  }
};
