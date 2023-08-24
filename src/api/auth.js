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
    return { success: false };
  }
};

export const register = async ({ account, name, email, password, checkPassword }) => {
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
    return data
  } catch (error) {
    console.error("[Register Failed]:", error);
    return { success: false, error };
  }
};
