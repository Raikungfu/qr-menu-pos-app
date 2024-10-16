const API_BASE_URL = (function () {
  const mode = import.meta.env.VITE_MODE;
  const urls = {
    DEV: import.meta.env.VITE_DEV_API_URL,
    PROD: import.meta.env.VITE_PROD_API_URL,
  };

  return urls[mode];
})();
