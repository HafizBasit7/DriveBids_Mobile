import useLoadFonts from "./Hooks/useLoadFonts";
import R1_App from "./R1_App";
import AuthContextProvider from "./R1_Contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdDetails from "./Screens/UmairScreens/AdDetails";
import MyAdDetails from "./Screens/UmairScreens/MyAdDetails";
const queryClient = new QueryClient();

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <R1_App />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
