import AppNavigator from "./Navigations/StackNavigation";
import { useAuth } from "./R1_Contexts/authContext";

export default function R1_App() {
    const {authState} = useAuth();
    
    if(authState.isLoading) {
        return null;
    }

    return (
        <AppNavigator />
    );
}