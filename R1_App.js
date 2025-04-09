import { ActivityIndicator } from "react-native-paper";
import AppNavigator from "./Navigations/StackNavigation";
import { useAuth } from "./R1_Contexts/authContext";
import { SafeAreaView } from "react-native";

export default function R1_App() {
    const {authState} = useAuth();
    
    if(authState.isLoading) {
        return <SafeAreaView><ActivityIndicator/></SafeAreaView>;
    }

    return (
        <AppNavigator/>
    );
}