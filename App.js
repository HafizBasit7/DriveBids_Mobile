import AppNavigator from "./Navigations/StackNavigation";
import useLoadFonts from "./Hooks/useLoadFonts";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// screens
import SignupScreen from "./Screens/Signupscreen";
import SignInScreen from "./Screens/SignInScreen";
import ForgetPass from "./Screens/ForgetPass";
import Verification from "./Screens/Verification";
import Reset from "./Screens/Reset";
import PassChanged from "./Screens/PassChanged";
import CodeScreen from "./Screens/CodeScreen";
// Components
import Header from "./CustomComponents/Header";
import Sidebar from "./CustomComponents/Sidebar";
import HomeBanner from "./CustomComponents/HomeBanner";
import { GlobalStyles } from "./Styles/GlobalStyles";
import CarDetails1 from "./Screens/CarDetails1";

// import VehicleReg from "./Screens/tahirScreens/VehicleReg";
// import VehicleInfo from "./Screens/tahirScreens/VehicleInfo";
// import CarImages from "./Screens/tahirScreens/CarImages";
// import Exterior1 from "./Screens/tahirScreens/CarExteriorImages/Exterior1";
// import Exterior2 from "./Screens/tahirScreens/CarExteriorImages/Exterior2";
// import Exterior3 from "./Screens/tahirScreens/CarExteriorImages/Exterior3";
// import Exterior4 from "./Screens/tahirScreens/CarExteriorImages/Exterior4";
// import Exterior5 from "./Screens/tahirScreens/CarExteriorImages/Exterior5";
// import Exterior6 from "./Screens/tahirScreens/CarExteriorImages/Exterior6";
// import Interior1 from "./Screens/tahirScreens/CarInteriorImages/Interior1";
// import Interior2 from "./Screens/tahirScreens/CarInteriorImages/Interior2";
// import Interior3 from "./Screens/tahirScreens/CarInteriorImages/Interior3";
// import Interior4 from "./Screens/tahirScreens/CarInteriorImages/Interior4";
// import Interior5 from "./Screens/tahirScreens/CarInteriorImages/Interior5";
// import Wheel1 from "./Screens/tahirScreens/WheelsImages/Wheel1";
// import Wheel2 from "./Screens/tahirScreens/WheelsImages/Wheel2";
// import Wheel3 from "./Screens/tahirScreens/WheelsImages/Wheel3";
// import Wheel4 from "./Screens/tahirScreens/WheelsImages/Wheel4";
// import Thread1 from "./Screens/tahirScreens/ThreadsImages/Thread1";
// import Thread2 from "./Screens/tahirScreens/ThreadsImages/Thread2";
// import Thread3 from "./Screens/tahirScreens/ThreadsImages/Thread3";
import Thread4 from "./Screens/tahirScreens/ThreadsImages/Thread4";
import SellCar from "./Screens/tahirScreens/SellCar";

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <AppNavigator />
    </>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
