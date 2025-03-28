import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {chatBaseUrl} from "../API_Callings/BaseURL/chat-baseurl";
import { useAuth } from "./authContext";
import { useQueryClient } from "@tanstack/react-query";
import { chatApiClient } from "../API_Callings/R1_API/axios-client";

const SocketContext = createContext(null);

export const useChatSocket = () => useContext(SocketContext);

export default function ChatSockerProvider ({ children })  {
    const [socket, setSocket] = useState(null);
    const {authState} = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        if(authState.isAuthenticated) {
           

            const newSocket = io(chatBaseUrl, {
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000, 
                transports: ["websocket"], 
                auth: {
                    token: chatApiClient.defaults.headers.common['Authorization'].split(" ")[1],
                },
            });
    
            setSocket(newSocket);
    
            newSocket.on("connect", () => {
                console.log("Connected to Chat server");
            });

            // update
            newSocket.on('new-chat', () => {
                queryClient.invalidateQueries(['chats']);
            });
            newSocket.on('new-message', (chatId) => {
                queryClient.invalidateQueries(['chats']);
                queryClient.invalidateQueries(['messages', chatId]);
            });
    
            newSocket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });
    
            newSocket.on("disconnect", (reason) => {
                console.warn("Socket disconnected:", reason);
            });
    
        }

        return () => {
            socket?.disconnect();
        };
    }, [authState.isAuthenticated]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};