import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {bidBaseUrl} from "../API_Callings/BaseURL/bidding-baseurl";
import { useAuth } from "./authContext";
import { useQueryClient } from "@tanstack/react-query";
import { bidApiClient } from "../API_Callings/R1_API/axios-client";

const SocketContext = createContext(null);

export const useBidSocket = () => useContext(SocketContext);

export default function BidSocketProvider ({ children })  {
    const [socket, setSocket] = useState(null);
    const {authState} = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        if(authState.isAuthenticated) {
            

            const newSocket = io(bidBaseUrl, {
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000, 
                transports: ["websocket"], 
                auth: {
                    token: bidApiClient.defaults.headers.common['Authorization'].split(" ")[1],
                },
            });
    
            setSocket(newSocket);
    
            newSocket.on("connect", () => {
                console.log("Connected to Bidding server");
            });

            //bid update
            newSocket.on('bid-update', (carId) => {
                queryClient.invalidateQueries(['car', carId]);
                queryClient.invalidateQueries(['biddingHistory', carId]);
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