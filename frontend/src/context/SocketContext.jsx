import { createContext, useEffect, useState } from "react";
import { connectSocket } from "../services/socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children, token }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      const ws = connectSocket(token);
      setSocket(ws);

      return () => ws.close();
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
