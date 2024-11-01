import { API_CHECK_IS_LOGIN } from "@/Service/User";
import { useEffect, useRef, useState } from "react";

const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const queryParam = new URLSearchParams(window.location.search);
  const tokenFromURL = queryParam.get("token");
  const token = tokenFromURL || localStorage.getItem("token");

  useEffect(() => {
    const checkLoginStatus = async () => {
      setError(null);
      try {
        const queryParam = new URLSearchParams(window.location.search);
        const tokenFromURL = queryParam.get("Token");
        const token = localStorage.getItem("Token") || tokenFromURL;
        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
        }
        const response = await API_CHECK_IS_LOGIN({ token });

        if (response != null) {
          setIsLoggedIn(true);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        timer.current = setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    checkLoginStatus();
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return { isLoggedIn, loading, error, token };
};

export default useCheckLoginStatus;
