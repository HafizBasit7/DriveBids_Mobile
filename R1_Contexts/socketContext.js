import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { chatBaseUrl } from "../API_Callings/BaseURL/chat-baseurl";
import { bidBaseUrl } from "../API_Callings/BaseURL/bidding-baseurl";
import { bidApiClient } from "../API_Callings/R1_API/axios-client";

const SocketContext = createContext({bidSocket: null, chatSocket: null});
export const useSocket = () => useContext(SocketContext);

export default function SocketContextProvider ({children}) {
    const [bidSocket, setBidSocket] = useState(null);
    const [chatSocket, setChatSocket] = useState(null);
    const {authState} = useAuth();
    const queryClient = useQueryClient();

    //Bid Socket
    useEffect(() => {
        if(authState.isAuthenticated && !bidSocket) {
            const newSocket = io(bidBaseUrl, {
                reconnection: true,
                autoConnect: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000, 
                transports: ["websocket"], 
                auth: {
                    token: bidApiClient.defaults.headers.common['Authorization'].split(" ")[1],
                },
            });
            setBidSocket(newSocket);

            //Events
            newSocket.on("connect", () => {
                console.log("Connected to Bidding server");
            });

            //bid update
            newSocket.on('bid-update', (carId) => {
                queryClient.invalidateQueries(['car', carId]);
                queryClient.invalidateQueries(['biddingHistory', carId]);
            });
        }

        return () => {
            bidSocket?.disconnect();
        };

    }, [authState.isAuthenticated, bidSocket]);

    //Chat Socket
    useEffect(() => {
        if(authState.isAuthenticated && !chatSocket) {
            const newSocket = io(chatBaseUrl, {
                reconnection: true,
                autoConnect: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000, 
                transports: ["websocket"], 
                auth: {
                    token: bidApiClient.defaults.headers.common['Authorization'].split(" ")[1],
                },
            });
            setChatSocket(newSocket);

            //Events
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

        }

        return () => {
            chatSocket?.disconnect();
        };

    }, [authState.isAuthenticated, chatSocket]);

    return (
        <SocketContext.Provider value={{bidSocket, chatSocket}}>
            {children}
        </SocketContext.Provider>
    )
};