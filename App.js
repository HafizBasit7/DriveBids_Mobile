import AppNavigator from "./Navigations/StackNavigation";
import useLoadFonts from "./Hooks/useLoadFonts";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// screens
import SignupScreen from "./Screens/signupscreen";
import SignInScreen from "./Screens/SignInScreen";
import ForgetPass from "./Screens/ForgetPass";
import Verification from "./Screens/Verification";
// Components
import Header from "./CustomComponents/Header";
import Sidebar from "./CustomComponents/Sidebar";
import HomeBanner from "./CustomComponents/HomeBanner";
import { GlobalStyles } from "./Styles/GlobalStyles";

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <HomeBanner />
    </>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
