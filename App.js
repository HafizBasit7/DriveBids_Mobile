import AppNavigator from "./Navigations/StackNavigation";
import useLoadFonts from "./Hooks/useLoadFonts";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// screens
// import SignupScreen from "./Screens/Signupscreen";
// import SignInScreen from "./Screens/SignInScreen";
import ForgetPass from "./Screens/ForgetPass";
import Verification from "./Screens/Verification";
// Components
import Header from "./CustomComponents/Header";
import Sidebar from "./CustomComponents/Sidebar";
import HomeBanner from "./CustomComponents/HomeBanner";
import { GlobalStyles } from "./Styles/GlobalStyles";
import SellCar from "./Screens/tahirScreens/SellCar";
import VehicleReg from "./Screens/tahirScreens/VehicleReg";
import VehicleInfo from "./Screens/tahirScreens/VehicleInfo";
import CarImages from "./Screens/tahirScreens/CarImages";
import Exterior1 from "./Screens/tahirScreens/CarExterior/Exterior1";
import Exterior2 from "./Screens/tahirScreens/CarExterior/Exterior2";
import Exterior3 from "./Screens/tahirScreens/CarExterior/Exterior3";
import Exterior4 from "./Screens/tahirScreens/CarExterior/Exterior4";
import Exterior5 from "./Screens/tahirScreens/CarExterior/Exterior5";
import Exterior6 from "./Screens/tahirScreens/CarExterior/Exterior6";
import Interior1 from "./Screens/tahirScreens/CarInterior/Interior1";
import Interior2 from "./Screens/tahirScreens/CarInterior/Interior2";
import Interior3 from "./Screens/tahirScreens/CarInterior/Interior3";
import Interior4 from "./Screens/tahirScreens/CarInterior/Interior4";
import Interior5 from "./Screens/tahirScreens/CarInterior/Interior5";

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      {/* <ForgetPass /> */}
      {/* <SellCar /> */}
      {/* <VehicleReg /> */}
      {/* <VehicleInfo /> */}
      {/* <CarImages /> */}
      {/* <Exterior1 /> */}
      {/* <Exterior2 /> */}
      {/* <Exterior3 /> */}
      {/* <Exterior4 /> */}
      {/* <Exterior5 /> */}
      {/* <Exterior6 /> */}
      {/* <Interior1 /> */}
      {/* <Interior2 /> */}
      {/* <Interior3 /> */}
      {/* <Interior4 /> */}
      {/* <Interior5 /> */}
    </>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
