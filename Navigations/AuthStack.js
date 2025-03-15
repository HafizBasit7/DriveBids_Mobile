import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../Screens/AuthStack/SignInScreen";
import Signupscreen from "../Screens/AuthStack/Signupscreen";
import ForgetPass from "../Screens/AuthStack/ForgetPass";
import Reset from "../Screens/AuthStack/Reset";
import CodeScreen from "../Screens/AuthStack/CodeScreen";
import PassChanged from "../Screens/AuthStack/PassChanged";
import OnboardingScreen from "../Screens/AuthStack/onboardingScreen";
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Signup" component={Signupscreen} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="PassChanged" component={PassChanged} />
    </Stack.Navigator>
  );
};

export default AuthStack;
