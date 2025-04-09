import { createStackNavigator } from "@react-navigation/stack";

// Screens
import ProfileScreen from "../Screens/Tahir-Screens/ProfileAndEditProfileScreen/ProfileScreen";
import EditProfile from "../Screens/Tahir-Screens/ProfileAndEditProfileScreen/EditProfile";
import MyBids from "../Screens/Tahir-Screens/MyBids/MyBids";
import WatchList from "../Screens/Tahir-Screens/WatchList/WatchList";
import Terms from "../Screens/Tahir-Screens/TermsAndConditions/Terms";
import NotificationSettingsScreen from "../Screens/Tahir-Screens/NotificationSetting/NotificationSetting";
import PasswordChangeScreen from "../Screens/Tahir-Screens/ChangePassword/ChangePassword";
import MyAds from "../Screens/Tahir-Screens/MyAds/MyAds";
import CompletedDeals from "../Screens/RehanScreens/CompletedDeals";

const Stack = createStackNavigator();

export default function R1_Profile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyAds" component={MyAds} />
      <Stack.Screen name="MyBids" component={MyBids} />
      <Stack.Screen name="CompletedDeals" component={CompletedDeals} />
      <Stack.Screen name="WatchList" component={WatchList} />
      <Stack.Screen name="NotificationSettingsScreen" component={NotificationSettingsScreen}/>
      <Stack.Screen name="PasswordChangeScreen" component={PasswordChangeScreen}/>
      <Stack.Screen name="Terms" component={Terms} />
    </Stack.Navigator>
  );
}
