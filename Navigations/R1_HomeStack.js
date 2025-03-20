import { createStackNavigator } from "@react-navigation/stack";

// Headers
import HomeHeader from "../CustomComponents/UmairComponents/Homeheader";
import Header from "../CustomComponents/UmairComponents/Header"; // Your second header

// Screens
import Home from "../Screens/Tahir-Screens/Home/Home";
import AdDetails from "../Screens/UmairScreens/AdDetails";
import ReserveMet from "../Screens/UmairScreens/ReserveMet";
import MyAdDetails from "../Screens/UmairScreens/MyAdDetails";
import PlaceBid from "../Screens/UmairScreens/PlaceBid";
import FiltersScreen from "../Screens/Tahir-Screens/FiltersScreen/Filters";
const Stack = createStackNavigator();

export default function R1_HomeStack() {
  return (
    <Stack.Navigator>
      {/* Home Screen with "Header" */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="FiltersScreen"
        component={FiltersScreen}
        options={{
          header: () => <Header />,
        }}
      />

      {/* Other Screens with "HomeHeader" */}
      <Stack.Screen
        name="AdDetails"
        component={AdDetails}
        options={{ header: () => <HomeHeader /> }}
      />
      <Stack.Screen
        name="MyAdDetails"
        component={MyAdDetails}
        options={{ header: () => <HomeHeader /> }}
      />
      <Stack.Screen
        name="PlaceBid"
        component={PlaceBid}
        options={{ header: () => <HomeHeader /> }}
      />
      <Stack.Screen
        name="ReserveMet"
        component={ReserveMet}
        options={{ header: () => <HomeHeader /> }}
      />
    </Stack.Navigator>
  );
}
