import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../CustomComponents/Header";
import Exterior1 from "../Screens/tahirScreens/CarExteriorImages/Exterior1";
import Exterior2 from "../Screens/tahirScreens/CarExteriorImages/Exterior2";
import Exterior3 from "../Screens/tahirScreens/CarExteriorImages/Exterior3";
import Exterior4 from "../Screens/tahirScreens/CarExteriorImages/Exterior4";
import Exterior5 from "../Screens/tahirScreens/CarExteriorImages/Exterior5";
import Exterior6 from "../Screens/tahirScreens/CarExteriorImages/Exterior6";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />, // Set custom header
        }}
      >
        <Stack.Screen name="Exterior1" component={Exterior1} />
        <Stack.Screen name="Exterior2" component={Exterior2} />
        <Stack.Screen name="Exterior3" component={Exterior3} />
        <Stack.Screen name="Exterior4" component={Exterior4} />
        <Stack.Screen name="Exterior5" component={Exterior5} />
        <Stack.Screen name="Exterior6" component={Exterior6} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
