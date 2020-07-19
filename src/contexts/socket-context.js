import React, { useEffect, useState, createContext } from 'react';
import socketIOClient from 'socket.io-client';
import { CHAT_API_URL } from '../utils/api-settings';

const SocketContext = createContext();
const ENDPOINT = CHAT_API_URL;

export const SocketProvider = props => {
  const [socketInstance, setSocketInstance] = useState(null);
  const [socketID, setSocketID] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      transports: ['websocket', 'polling'],
      forceNew: true,
    });
    socket.on('connect', () => {
      setSocketID(socket.id);
      setSocketInstance(socket);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketInstance,
        socketID: socketID,
      }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
