import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "../Screens/onboardingScreen";
import SignupScreen from "../Screens/signupscreen";
// import LoginScreen from "../screens/LoginScreen"; // Create LoginScreen.jsx
// import SignUpScreen from "../screens/SignUpScreen"; // Create SignUpScreen.jsx

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="SignUp" component={SignupScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
