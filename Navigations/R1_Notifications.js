import { createStackNavigator } from "@react-navigation/stack";

// Screens
import NotificationSettingsScreen from "../Screens/Tahir-Screens/NotificationSetting/NotificationSetting";
import NotificationScreen from "../Screens/Tahir-Screens/Notifications/Notifications";
const Stack = createStackNavigator();

export default function R1_Notifications() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
