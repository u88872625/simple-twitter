import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom/dist";
import { login, register, adminLogin } from "../api/auth";
import { addTweet, replyTweet } from "../api/tweets";
import { patchUserInfo } from "../api/user";
import { useNavigate } from "react-router-dom/dist";
import jwt_decode from "jwt-decode";

const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
  role: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  // 使用者自己的Tweet更新
  const [isTweetUpdated, setIsTweetUpdated] = useState(false);
  // 使用者編輯個人資料
  const [editedUserInfo, setEditedUserInfo] = useState(null);
  // 使用者更新個人資料
  const [isEditedUserInfo, setIsEditedUserInfo] = useState(false);
  // 若有更新過回覆推文
  const [isReplyUpdated, setIsReplyUpdated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      if (
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/admin"
      )
        return;

      setIsTweetUpdated(false);
      //更新過回覆推文後
      setIsReplyUpdated(false);
      // 從 localStorage 取得 token
      const token = localStorage.getItem("token");
      // 如果沒有token 則返回
      if (!token) {
        setIsAuthenticated(false);
        setPayload(null);
        return navigate("/login");
      }

      // 如果有 token 用jwt分析
      if (token) {
        const tempPayload = jwt_decode(token);
        setPayload(tempPayload);

        if (!tempPayload) {
          setIsAuthenticated(false);
          setPayload(null);
          return navigate("/login");
        }
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
        navigate("/login");
      }
    };
    checkTokenIsValid();
  }, [pathname, navigate]);

  // // 更新本地存放的用戶數據
  //  const updatedUser = {
  //   ...payload,
  //  account: updatedInfo.account,
  //    name: updatedInfo.name,
  //    introduction: updatedInfo.introduction,
  //    avatar: updatedInfo.avatar,
  //    email: updatedInfo.email,
  //    banner: updatedInfo.banner,
  //  };
  //  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  const updateUserInfo = (updatedInfo) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      account: updatedInfo.account,
      name: updatedInfo.name,
      introduction: updatedInfo.introduction,
      avatar: updatedInfo.avatar,
      email: updatedInfo.email,
      banner: updatedInfo.banner,
    }));

    setCurrentUser({
      ...currentUser,
      avatar: updatedInfo.avatar,
      email: updatedInfo.email,
      banner: updatedInfo.banner,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload && {
          id: payload.id,
          account: payload.account,
          avatar: payload.avatar,
          banner: payload.banner,
          name: payload.name,
          email: payload.email,
          password: payload.password,
          checkPassword: payload.checkPassword,
          introduction: payload.introduction,
          role: payload.role,
        },
        updateUserInfo,
        isTweetUpdated,
        setIsTweetUpdated,
        editedUserInfo,
        setEditedUserInfo,
        isReplyUpdated,
        setIsReplyUpdated,
        isEditedUserInfo,
        setIsEditedUserInfo,

        register: async (data) => {
          const response = await register({
            account: data.account,
            name: data.name,
            email: data.email,
            password: data.password,
            checkPassword: data.checkPassword,
          });
          const { success } = response;
          if (success) {
            const token = response.data.token;
            const id = response.data.user.id;

            const tempPayload = jwt_decode(token);
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            localStorage.setItem("userId", id);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return response;
        },

        login: async (data) => {
          const response = await login({
            account: data.account,
            password: data.password,
          });
          const { success } = response;

          if (success) {
            const token = response.data.token;
            const id = response.data.user.id;

            const temPayload = jwt_decode(token);
            setPayload(temPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            localStorage.setItem("userId", id);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return response;
        },
        adminLogin: async (data) => {
          const response = await adminLogin({
            account: data.account,
            password: data.password,
          });
          const { success } = response;
          if (success) {
            const token = response.data.token;
            const id = response.data.user.id;

            const temPayload = jwt_decode(token);
            setPayload(temPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            localStorage.setItem("userId", id);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return response;
        },
        logout: async () => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");

          setPayload(null);
          setIsAuthenticated(false);
        },
        addTweet: async (data) => {
          const response = await addTweet({ description: data.description });
          if (response.data) setIsTweetUpdated(true);
          return response;
        },
        replyTweet: async (id, { comment }) => {
          const response = await replyTweet(id, { comment });
          if (response.data) setIsReplyUpdated(true);
          return response;
        },
        patchUserInfo: async (formData, payload) => {
          const response = await patchUserInfo(formData, payload);
          if (response.data) {
            updateUserInfo(response.data);
          }
          return response;
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
