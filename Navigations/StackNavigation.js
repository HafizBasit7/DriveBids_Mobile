import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../CustomComponents/Header";
import Exterior1 from "../Screens/tahirScreens/CarExteriorImages/Exterior1";
import Exterior2 from "../Screens/tahirScreens/CarExteriorImages/Exterior2";
import Exterior3 from "../Screens/tahirScreens/CarExteriorImages/Exterior3";
import Exterior4 from "../Screens/tahirScreens/CarExteriorImages/Exterior4";
import Exterior5 from "../Screens/tahirScreens/CarExteriorImages/Exterior5";
import Exterior6 from "../Screens/tahirScreens/CarExteriorImages/Exterior6";

import Interior1 from "../Screens/tahirScreens/CarInteriorImages/Interior1";
import Interior2 from "../Screens/tahirScreens/CarInteriorImages/Interior2";
import Interior3 from "../Screens/tahirScreens/CarInteriorImages/Interior3";
import Interior4 from "../Screens/tahirScreens/CarInteriorImages/Interior4";
import Interior5 from "../Screens/tahirScreens/CarInteriorImages/Interior5";

import Thread1 from "../Screens/tahirScreens/ThreadsImages/Thread1";
import Thread2 from "../Screens/tahirScreens/ThreadsImages/Thread2";
import Thread3 from "../Screens/tahirScreens/ThreadsImages/Thread3";
import Thread4 from "../Screens/tahirScreens/ThreadsImages/Thread4";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />,
        }}
      >
        {/* Exterior Screens */}
        {/* <Stack.Screen name="Exterior1" component={Exterior1} />
        <Stack.Screen name="Exterior2" component={Exterior2} />
        <Stack.Screen name="Exterior3" component={Exterior3} />
        <Stack.Screen name="Exterior4" component={Exterior4} />
        <Stack.Screen name="Exterior5" component={Exterior5} />
        <Stack.Screen name="Exterior6" component={Exterior6} /> */}

        {/* Interior Screens */}
        {/* <Stack.Screen name="Interior1" component={Interior1} />
        <Stack.Screen name="Interior2" component={Interior2} />
        <Stack.Screen name="Interior3" component={Interior3} />
        <Stack.Screen name="Interior4" component={Interior4} />
        <Stack.Screen name="Interior5" component={Interior5} /> */}

        {/* Thread Screens */}
        <Stack.Screen name="Thread1" component={Thread1} />
        <Stack.Screen name="Thread2" component={Thread2} />
        <Stack.Screen name="Thread3" component={Thread3} />
        <Stack.Screen name="Thread4" component={Thread4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
