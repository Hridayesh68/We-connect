const LOCAL_URL = "http://localhost:8080";
const RENDER_URL = "https://we-connect-lycm.onrender.com";

let currentBaseUrl = LOCAL_URL;

// We can try to ping the local server once
export const getBackendUrl = () => {
  return currentBaseUrl;
};

export const setBackendUrl = (url) => {
  currentBaseUrl = url;
};

export { LOCAL_URL, RENDER_URL };
