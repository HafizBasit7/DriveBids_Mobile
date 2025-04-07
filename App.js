import { enableScreens } from 'react-native-screens';
enableScreens();
import useLoadFonts from "./Hooks/useLoadFonts";
import R1_App from "./R1_App";
import AuthContextProvider from "./R1_Contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SocketContextProvider from "./R1_Contexts/socketContext";

const queryClient = new QueryClient();

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (    
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <SocketContextProvider>
          <R1_App/>
        </SocketContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}