import AppNavigator from "./Navigations/StackNavigation";
import SignupScreen from "./Screens/signupscreen";
import SignInScreen from "./Screens/SignInScreen";
import ForgetPass from "./Screens/ForgetPass";
import Verification from "./Screens/Verification";
export default function App() {
  return <ForgetPass />;
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
