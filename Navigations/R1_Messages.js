import { createStackNavigator } from "@react-navigation/stack";

// Screens
import ActiveChatBox from "../Screens/Tahir-Screens/Messages/ActiveChatBox";
import ChatHeads from "../Screens/Tahir-Screens/Messages/ChatHeads";

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
    </Stack.Navigator>
  );
}
