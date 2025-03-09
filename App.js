import AppNavigator from "./Navigations/StackNavigation";
import useLoadFonts from "./Hooks/useLoadFonts";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// screens
// import SignupScreen from "./Screens/Signupscreen";
// import SignInScreen from "./Screens/SignInScreen";
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
import SellCar from "./Screens/tahirScreens/SellCar";
import VehicleReg from "./Screens/tahirScreens/VehicleReg";
import VehicleInfo from "./Screens/tahirScreens/VehicleInfo";
import CarImages from "./Screens/tahirScreens/CarImages";
import Exterior1 from "./Screens/tahirScreens/CarExteriorImages/Exterior1";
import Exterior2 from "./Screens/tahirScreens/CarExteriorImages/Exterior2";
import Exterior3 from "./Screens/tahirScreens/CarExteriorImages/Exterior3";
import Exterior4 from "./Screens/tahirScreens/CarExteriorImages/Exterior4";
import Exterior5 from "./Screens/tahirScreens/CarExteriorImages/Exterior5";
import Exterior6 from "./Screens/tahirScreens/CarExteriorImages/Exterior6";
import Interior1 from "./Screens/tahirScreens/CarInteriorImages/Interior1";
import Interior2 from "./Screens/tahirScreens/CarInteriorImages/Interior2";
import Interior3 from "./Screens/tahirScreens/CarInteriorImages/Interior3";
import Interior4 from "./Screens/tahirScreens/CarInteriorImages/Interior4";
import Interior5 from "./Screens/tahirScreens/CarInteriorImages/Interior5";
import Wheel1 from "./Screens/tahirScreens/WheelsImages/Wheel1";
import Wheel2 from "./Screens/tahirScreens/WheelsImages/Wheel2";
import Wheel3 from "./Screens/tahirScreens/WheelsImages/Wheel3";
import Wheel4 from "./Screens/tahirScreens/WheelsImages/Wheel4";
import Thread1 from "./Screens/tahirScreens/ThreadsImages/Thread1";
import Thread2 from "./Screens/tahirScreens/ThreadsImages/Thread2";
import Thread3 from "./Screens/tahirScreens/ThreadsImages/Thread3";
import Thread4 from "./Screens/tahirScreens/ThreadsImages/Thread4";
import Draft from "./Screens/tahirScreens/Draft";
import CarCameraOverlay from "./Screens/tahirScreens/CameraOverlay";
import InspectionReport1 from "./Screens/tahirScreens/InspectionReport/InspectionReport1";
import InspectionReport2 from "./Screens/tahirScreens/InspectionReport/InspectionReport2";
import InspectionReport3 from "./Screens/tahirScreens/InspectionReport/InspectionReport3";
import DamageInspection from "./Screens/tahirScreens/DamageLabels/DamageLabels";

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <DamageInspection />
      {/* <InspectionReport3 /> */}
      {/* <InspectionReport2 /> */}
      {/* <InspectionReport1 /> */}
      {/* <CarCameraOverlay /> */}
      {/* <Draft /> */}
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
      {/* <Wheel1 /> */}
      {/* <Wheel2 /> */}
      {/* <Wheel3 /> */}
      {/* <Wheel4 /> */}
      {/* <Thread1 /> */}
      {/* <Thread2 /> */}
      {/* <Thread3 /> */}
      {/* <Thread4 /> */}
    </>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
