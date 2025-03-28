import useLoadFonts from "./Hooks/useLoadFonts";
import R1_App from "./R1_App";
import AuthContextProvider from "./R1_Contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatSockerProvider from "./R1_Contexts/chatContext";
import BidSocketProvider from "./R1_Contexts/bidContext";

const queryClient = new QueryClient();

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (    
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <BidSocketProvider>
          <ChatSockerProvider>
            <R1_App/>
          </ChatSockerProvider>
        </BidSocketProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}