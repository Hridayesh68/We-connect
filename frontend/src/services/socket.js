let socket = null;

export const connectSocket = (token) => {
  const wsUrl = import.meta.env.MODE === "development" 
    ? `ws://localhost:8080/ws?token=${token}` 
    : `wss://we-connect-three.vercel.app/ws?token=${token}`;
  socket = new WebSocket(wsUrl);
  return socket;
};

export const getSocket = () => socket;
