import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom/dist";
import { login } from "../api/auth";
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
      // 從 localStorage 取得 token
      const authToken = localStorage.getItem("token");
      // 如果沒有token 則返回
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return navigate("/login");
      }

      // 如果有 token 用jwt分析
      if (authToken) {
        const tempPayload = jwt_decode(authToken);
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload && {
          id: payload.id,
          avatar: payload.avatar,
        },
        isTweetUpdated,
        setIsTweetUpdated,
        login: async (data) => {
          const response = await login({
            account: data.account,
            password: data.password,
          });
          const { success } = response;
          const token = response.data.token;
          if (success) {
            const temPayload = jwt_decode(token);
            setPayload(temPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return response;
        },
        logout: () => {
          localStorage.removeItem("token");
          setPayload(null);
          setIsAuthenticated(false);
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
