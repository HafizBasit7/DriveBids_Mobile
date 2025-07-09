import { ActivityIndicator } from "react-native-paper";
import AppNavigator from "./Navigations/StackNavigation";
import { useAuth } from "./R1_Contexts/authContext";
import { SafeAreaView } from "react-native";
import registerForPushToken from "./utils/notification";
import { useEffect } from "react";

export default function R1_App() {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      registerForPushToken();
    }
  }, [authState.isAuthenticated]);

  if (authState.isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return <AppNavigator />;
}
