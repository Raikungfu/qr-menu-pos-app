import { API_CHECK_IS_LOGIN } from "@/Service/User";
import React, { useEffect } from "react";

const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParam = new URLSearchParams(window.location.search);
        const tokenFromURL = queryParam.get("token");
        const token = tokenFromURL || localStorage.getItem("token");
        console.log("Token from URL: ", token);
        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }
        const response = await API_CHECK_IS_LOGIN({ token });
        
        if (response != null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      }
    };
    checkLoginStatus();
  }, []);

  return { isLoggedIn, loading, error };
};

export default useCheckLoginStatus;
