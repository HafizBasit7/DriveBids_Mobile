import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import R1_SellCarStack from "./R1_SellCarStack";


const Tab = createBottomTabNavigator();

export default function R1_DashboardStack () {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="SellCar"
                component={R1_SellCarStack}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    )
}