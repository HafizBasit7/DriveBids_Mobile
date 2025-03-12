import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../R1_Contexts/authContext";
import R1_AuthStack from "./R1_AuthStack";
import R1_DashboardStack from "./R1_DashboardStack";


const AppNavigator = () => {

  const {authState} = useAuth();

  return (
    <NavigationContainer>
      {authState.isAuthenticated ?  <R1_DashboardStack/> : <R1_AuthStack/>}
    </NavigationContainer>
  );
};

export default AppNavigator;
