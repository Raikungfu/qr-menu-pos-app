import { API_CHECK_IS_LOGIN } from "@/Service/User";
import { useEffect, useState } from "react";

const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParam = new URLSearchParams(window.location.search);
        const tokenFromURL = queryParam.get("token");
        const token = tokenFromURL || localStorage.getItem("token");

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
      } catch (err: any) {
        setError(err.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { isLoggedIn, loading, error };
};

export default useCheckLoginStatus;
