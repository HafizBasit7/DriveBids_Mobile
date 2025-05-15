import { createStackNavigator } from "@react-navigation/stack";

// Screens
import ActiveChatBox from "../Screens/Tahir-Screens/Messages/ActiveChatBox";
import ChatHeads from "../Screens/Tahir-Screens/Messages/ChatHeads";
import AdDetails from "../Screens/UmairScreens/AdDetails";
import PlaceBid from "../Screens/UmairScreens/PlaceBid";
import OwnerProfile from "../Screens/Tahir-Screens/OwnerProfile/OwnerProfile";

const Stack = createStackNavigator();

export default function R1_Messages() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ChatHeads"
    >
      <Stack.Screen name="ChatHeads" component={ChatHeads} />
      <Stack.Screen name="ActiveChatBox" component={ActiveChatBox} />

      {/* car */}
      <Stack.Screen
        name="AdDetails"
        component={AdDetails}
        options={{headerShown: false}}
      />
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
    </Stack.Navigator>
  );
}
