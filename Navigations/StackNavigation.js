import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../R1_Contexts/authContext";
import R1_AuthStack from "./R1_AuthStack";
import R1_DashboardStack from "./R1_DashboardStack";
import R1_HomeStack from "./R1_HomeStack";

const AppNavigator = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      {authState.isAuthenticated ? (
        authState.isHome ? (
          <R1_HomeStack />
        ) : (
          <R1_DashboardStack />
        )
      ) : (
        <R1_AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
