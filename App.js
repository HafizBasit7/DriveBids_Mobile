import AppNavigator from "./Navigations/StackNavigation";
// screens
import SignupScreen from "./Screens/signupscreen";
import SignInScreen from "./Screens/SignInScreen";
import ForgetPass from "./Screens/ForgetPass";
import Verification from "./Screens/Verification";
// Components
import Header from "./CustomComponents/Header";
import Sidebar from "./CustomComponents/Sidebar";
export default function App() {
  return <Sidebar />;
}

// import { Text } from "react-native-paper";
// import CustomButton from "./CustomComponents/CustomButton";
// import useLoadFonts from "./Hooks/useLoadFonts";

// export default function App() {
//   const fontsLoaded = useLoadFonts();
//   if (!fontsLoaded) {
//     return null;
//   }
//   return (
//     <>
//       <Text>HI HI HI </Text>
//       <CustomButton />
//     </>
//   );
// }
