import axios from "axios";
import { LOCAL_URL, RENDER_URL, setBackendUrl, getBackendUrl } from "./config";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? `${LOCAL_URL}/api` : `${RENDER_URL}/api`,
  withCredentials: true,
});

// Response interceptor for dynamic fallback
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If local backend fails (connection error or CORS failure) in development
    if (import.meta.env.MODE === "development" && 
        originalRequest.baseURL.includes("localhost") && 
        !originalRequest._retry) {
      
      console.warn("Local backend failed, falling back to Render...");
      originalRequest._retry = true;
      
      // Update config and axios instance
      const newBaseUrl = `${RENDER_URL}/api`;
      setBackendUrl(RENDER_URL);
      originalRequest.baseURL = newBaseUrl;
      
      return axiosInstance(originalRequest);
    }
    
    return Promise.reject(error);
  }
);
