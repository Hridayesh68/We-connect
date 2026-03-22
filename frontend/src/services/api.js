const API_BASE = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "https://we-connect-lycm.onrender.com/api";

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const fetchMessages = async (token, userId) => {
  const res = await fetch(`${API_BASE}/messages/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
