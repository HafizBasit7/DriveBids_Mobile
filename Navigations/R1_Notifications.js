import { createStackNavigator } from "@react-navigation/stack";

// Screens
import NotificationScreen from "../Screens/Tahir-Screens/Notifications/Notifications";
import Header from "../CustomComponents/Header"; 
import AdDetails from "../Screens/UmairScreens/AdDetails";
import ActiveChatBox from "../Screens/Tahir-Screens/Messages/ActiveChatBox";
import PlaceBid from "../Screens/UmairScreens/PlaceBid";
import OwnerProfile from "../Screens/Tahir-Screens/OwnerProfile/OwnerProfile";

const Stack = createStackNavigator();

export default function R1_Notifications() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header showSearch={false} title={'Notifications'}/>
      }}
    >
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen
        name="AdDetails"
        component={AdDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ActiveChatBox" component={ActiveChatBox} options={{headerShown: false}} />
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
