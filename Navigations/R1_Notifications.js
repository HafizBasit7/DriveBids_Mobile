import { createStackNavigator } from "@react-navigation/stack";

// Screens
import NotificationScreen from "../Screens/Tahir-Screens/Notifications/Notifications";
import Header from "../CustomComponents/Header"; 

const Stack = createStackNavigator();

export default function R1_Notifications() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header showSearch={false} title={'Notifications'}/>
      }}
    >
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
