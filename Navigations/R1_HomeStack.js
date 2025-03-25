import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Home from "../Screens/Tahir-Screens/Home/Home";
import AdDetails from "../Screens/UmairScreens/AdDetails";
// import ReserveMet from "../Screens/UmairScreens/ReserveMet";
// import MyAdDetails from "../Screens/UmairScreens/MyAdDetails";
import PlaceBid from "../Screens/UmairScreens/PlaceBid";
import FiltersScreen from "../Screens/Tahir-Screens/FiltersScreen/Filters";
import OwnerProfile from "../Screens/Tahir-Screens/OwnerProfile/OwnerProfile";
import Filters_ViewAll from "../Screens/Tahir-Screens/Filter&ViewAll/Filter&ViewAll";

const Stack = createStackNavigator();

export default function R1_HomeStack() {
  return (
    <Stack.Navigator >

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FiltersScreen"
        component={FiltersScreen}
        options={{
          headerShown: false,
        }}
      />
         <Stack.Screen
        name="Filters_ViewAll"
        component={ Filters_ViewAll}
        options={{
          headerShown: false,
        }}
      />
     

      <Stack.Screen
        name="AdDetails"
        component={AdDetails}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="MyAdDetails"
        component={MyAdDetails}
      /> */}

      <Stack.Screen
        name="PlaceBid"
        component={PlaceBid}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OwnerProfile"
        component={OwnerProfile}
        options={{headerShown: false}}
      />
      
      {/* <Stack.Screen
        name="ReserveMet"
        component={ReserveMet}
      /> */}
    </Stack.Navigator>
  );
}
