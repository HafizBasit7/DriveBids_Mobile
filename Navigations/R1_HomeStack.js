import { createStackNavigator } from "@react-navigation/stack";

//Header
import HomeHeader from "../CustomComponents/UmairComponents/Homeheader";
//AdDetails
import AdDetails from "../Screens/UmairScreens/AdDetails";
import ReserveMet from "../Screens/UmairScreens/ReserveMet";
import MyAdDetails from "../Screens/UmairScreens/MyAdDetails";
import PlaceBid from "../Screens/UmairScreens/PlaceBid";
const Stack = createStackNavigator();

export default function R1_HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <HomeHeader />, // Default header for all screens
      }}
    >
      {/* Sell Car */}
      <Stack.Screen name="AdDetails" component={AdDetails} />
      <Stack.Screen name="MyAdDetails" component={MyAdDetails} />
      <Stack.Screen name="PlaceBid" component={PlaceBid} />
      <Stack.Screen name="ReserveMet" component={ReserveMet} />
    </Stack.Navigator>
  );
}
