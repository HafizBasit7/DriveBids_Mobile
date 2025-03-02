import AppNavigator from "./Navigations/StackNavigation";
import SignupScreen from "./Screens/signupscreen";
export default function App() {
  return <SignupScreen />;
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
