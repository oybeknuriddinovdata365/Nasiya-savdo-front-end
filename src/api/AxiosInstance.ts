import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API,
});

// REQUEST → access tokenni headerga qo‘shadi
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE → access token tugasa refresh qiladi
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Access token muddati tugagan bo‘lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        // REFRESH API-chaqiramiz
        const res = await axios.post(`${API}/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccess = res.data.data.access_token;
        const newRefresh = res.data.data.refresh_token;

        // Tokenlarni yangilaymiz
        localStorage.setItem("access_token", newAccess);
        localStorage.setItem("refresh_token", newRefresh);

        // Oldingi requestga yangi access token qo‘shamiz
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // Requestni qayta ishlaymiz (retry)
        return axiosInstance(originalRequest);
      } catch (err) {
        // Refresh ham tugagan bo‘lsa → logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
