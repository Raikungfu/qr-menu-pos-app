const API_BASE_URL = (function () {
  const mode = import.meta.env.VITE_MODE;
  const urls = {
    DEV: import.meta.env.VITE_DEV_API_URL,
    PROD: import.meta.env.VITE_PROD_API_URL,
  };

  return urls[mode];
})();

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    localStorage.setItem("token", token);

    fetch(`${API_BASE_URL}/login-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/";
        } else {
          console.error("Đăng nhập không thành công:", data.message);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      });
  }
});
