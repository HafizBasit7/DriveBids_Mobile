import AppNavigator from "./Navigations/StackNavigation";

export default function App() {
  return <AppNavigator />;
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
