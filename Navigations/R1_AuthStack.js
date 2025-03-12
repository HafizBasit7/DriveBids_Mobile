import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../Screens/AuthStack/onboardingScreen";
import SignInScreen from "../Screens/AuthStack/SignInScreen";
import SignupScreen from "../Screens/AuthStack/Signupscreen";
import ForgetPass from "../Screens/AuthStack/ForgetPass";
import CodeScreen from "../Screens/AuthStack/CodeScreen";
import Reset from "../Screens/AuthStack/Reset";
import PassChanged from "../Screens/AuthStack/PassChanged";
import { useAuth } from "../R1_Contexts/authContext";

const Stack = createStackNavigator();

export default function R1_AuthStack () {
    const {authState} = useAuth();

    return (
        <Stack.Navigator
            initialRouteName={authState.isFirstTime ? "onboardingScreen" : 'SignInScreen'}
        >
            {/* Onboarding Screen without Header */}
            <Stack.Screen
                name="onboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signupscreen"
                component={SignupScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgetPass"
                component={ForgetPass}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CodeScreen"
                component={CodeScreen}
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
        </Stack.Navigator>
    );
}