import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import SellCarStack from "./SellCarStack";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* SellCar Stack - Headers are shown as defined inside SellCarStack */}
        <Tab.Screen
          name="SellCar"
          component={SellCarStack}
          options={{ headerShown: false }} // Hide tab navigator's header, but keep internal headers
        />

        {/* Auth Stack - Ensure no headers at all */}
        <Tab.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
