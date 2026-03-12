let socket = null;

export const connectSocket = (token) => {
  socket = new WebSocket(`ws://localhost:8080/ws?token=${token}`);
  return socket;
};

export const getSocket = () => socket;
