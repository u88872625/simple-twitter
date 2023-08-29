import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom/dist";
import { login, register } from "../api/auth";
import { addTweet } from "../api/tweets";
import { useNavigate } from "react-router-dom/dist";
import jwt_decode from "jwt-decode";

const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  // 使用者自己的Tweet更新
  const [isTweetUpdated, setIsTweetUpdated] = useState(false);
  // 儲存 userInfo 物件方便運用，裡面包含 account、avatar、banner、name 等
  const [userInfo, setUserInfo] = useState({});
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //如果換頁要去的目的是登入/註冊頁面的話，請不用認證token
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/admin"
    )
      return;
    //更新完Tweet後，要把isTweetUpdated退回false狀態
    setIsTweetUpdated(false);

    const checkTokenIsValid = async () => {
      // 從 localStorage 拿 token
      const token = localStorage.getItem("token");
      // 如果 token 不存在則進行相關設定
      if (!token) {
        setIsAuthenticated(false);
        setPayload(null);
        return navigate("/login");
      }
      // 若 token 存在則驗證其有效性
      // 這邊似乎交給後端驗證？
      // const result = await checkPermission(authToken);

      // 如果有 token（但似乎要給後端檢核是否有效）
      if (token) {
        const tempPayload = jwt_decode(token);
        setPayload(tempPayload);
        //分析jwt解密的payload是否真的有此使用者
        if (!tempPayload) {
          setIsAuthenticated(false);
          setPayload(null);
          return navigate("/login");
        }
        setIsAuthenticated(true);
        // 使用 localStorage 中的 userInfo 來初始化
        const savedUserInfo = localStorage.getItem("userInfo");
        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo));
        }
      } else {
        // 無效
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload && {
          id: payload.id,
          account: payload.account,
          avatar: payload.avatar,
          id: payload.id,
        },
        isTweetUpdated,
        setIsTweetUpdated,
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
            const temPayload = jwt_decode(token);
            setPayload(temPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            setUserInfo(response.data.user);
            localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data.user)
            );
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

          navigate("/login");
        },
        addTweet: async (data) => {
          const response = await addTweet({ description: data.description });
          if (response.data) setIsTweetUpdated(true);
          return response;
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
