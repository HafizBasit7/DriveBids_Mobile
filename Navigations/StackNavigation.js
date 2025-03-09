import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../CustomComponents/Header";
// Sell Car
import onboardingScreen from "../Screens/onboardingScreen";
import SellCar from "../Screens/SellCar";
import Draft from "../Screens/Draft";
import VehicleReg from "../Screens/VehicleReg";
import VehicleInfo from "../Screens/VehicleInfo";
import CarImages from "../Screens/CarImages";
import SignInScreen from "../Screens/SignInScreen";
import Signupscreen from "../Screens/Signupscreen";
import ForgetPass from "../Screens/ForgetPass";
import Reset from "../Screens/Reset";
import PassChanged from "../Screens/PassChanged";
// Exterior
import Exterior1 from "../Screens/CarExteriorImages/Exterior1";
import Exterior2 from "../Screens/CarExteriorImages/Exterior2";
import Exterior3 from "../Screens/CarExteriorImages/Exterior3";
import Exterior4 from "../Screens/CarExteriorImages/Exterior4";
import Exterior5 from "../Screens/CarExteriorImages/Exterior5";
import Exterior6 from "../Screens/CarExteriorImages/Exterior6";
// Interior
import Interior1 from "../Screens/CarInteriorImages/Interior1";
import Interior2 from "../Screens/CarInteriorImages/Interior2";
import Interior3 from "../Screens/CarInteriorImages/Interior3";
import Interior4 from "../Screens/CarInteriorImages/Interior4";
import Interior5 from "../Screens/CarInteriorImages/Interior5";
// Thread
import Thread1 from "../Screens/ThreadsImages/Thread1";
import Thread2 from "../Screens/ThreadsImages/Thread2";
import Thread3 from "../Screens/ThreadsImages/Thread3";
import Thread4 from "../Screens/ThreadsImages/Thread4";
// Wheel
import Wheel1 from "../Screens/WheelsImages/Wheel1";
import Wheel2 from "../Screens/WheelsImages/Wheel2";
import Wheel3 from "../Screens/WheelsImages/Wheel3";
import Wheel4 from "../Screens/WheelsImages/Wheel4";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />, // Default header for all screens
        }}
      >
        {/* Onboarding Screen without Header */}
        <Stack.Screen
          name="onboardingScreen"
          component={onboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signupscreen"
          component={Signupscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPass"
          component={ForgetPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PassChanged"
          component={PassChanged}
          options={{ headerShown: false }}
        />

        {/* Sell Car */}
        <Stack.Screen name="SellCar" component={SellCar} />
        <Stack.Screen name="Draft" component={Draft} />
        <Stack.Screen name="VehicleReg" component={VehicleReg} />
        <Stack.Screen name="VehicleInfo" component={VehicleInfo} />
        <Stack.Screen name="CarImages" component={CarImages} />

        {/* Exterior Screens */}
        <Stack.Screen name="Exterior1" component={Exterior1} />
        <Stack.Screen name="Exterior2" component={Exterior2} />
        <Stack.Screen name="Exterior3" component={Exterior3} />
        <Stack.Screen name="Exterior4" component={Exterior4} />
        <Stack.Screen name="Exterior5" component={Exterior5} />
        <Stack.Screen name="Exterior6" component={Exterior6} />

        {/* Interior Screens */}
        <Stack.Screen name="Interior1" component={Interior1} />
        <Stack.Screen name="Interior2" component={Interior2} />
        <Stack.Screen name="Interior3" component={Interior3} />
        <Stack.Screen name="Interior4" component={Interior4} />
        <Stack.Screen name="Interior5" component={Interior5} />

        {/* Thread Screens */}
        <Stack.Screen name="Thread1" component={Thread1} />
        <Stack.Screen name="Thread2" component={Thread2} />
        <Stack.Screen name="Thread3" component={Thread3} />
        <Stack.Screen name="Thread4" component={Thread4} />

        {/* Wheels Screens */}
        <Stack.Screen name="Wheel1" component={Wheel1} />
        <Stack.Screen name="Wheel2" component={Wheel2} />
        <Stack.Screen name="Wheel3" component={Wheel3} />
        <Stack.Screen name="Wheel4" component={Wheel4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
