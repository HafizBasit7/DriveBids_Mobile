import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import R1_SellCarStack from "./R1_SellCarStack";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Svg, { Path } from "react-native-svg";
import R1_HomeStack from "./R1_HomeStack";
import R1_Messages from "./R1_Messages";
import R1_Profile from "./R1_Profile";
import R1_Notification from "./R1_Notifications";
import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../API_Callings/R1_API/Auth";
import { CommonActions, getFocusedRouteNameFromRoute  } from "@react-navigation/native";
import { hasUnreadMessages } from "../API_Callings/R1_API/Chat";

//Custom button
const CustomTabBarButton = ({ onPress }) => (
  <View style={styles.sellButtonWrapper}>
    <TouchableOpacity style={styles.plusButton} onPress={onPress}>
      <View style={styles.plusContainer}>
        <Icon name="plus" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
    <Text style={styles.sellLabel}> Sell</Text>
  </View>
);

const RedDotMessages = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["messagesCount"],
    queryFn: hasUnreadMessages,
  });

  const count = data?.data.haveUnread;

  if (count < 1 || !count || isLoading) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: -2,
        right: -3,
        backgroundColor: "red",
        width: 10,
        height: 10,
        borderRadius: 5,
      }}
    />
  );
};

//

const RedDotNotification = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notificationCount"],
    queryFn: getNotificationCount,
    refetchOnMount: false,
  });
  const count = data?.data.count;

  if (count < 1 || !count || isLoading) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: -2,
        right: -3,
        backgroundColor: "red",
        width: 10,
        height: 10,
        borderRadius: 5,
      }}
    />
  );
};

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

export default function R1_DashboardStack() {
  const formattedWidth = width / 100;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: "#2C6BED",
        headerShown: false,
        backgroundColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={R1_HomeStack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: "Home", state: { routes: [{ name: "Home" }] } },
                ],
              })
            );
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: formattedWidth * 2.7 },
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={R1_Notification}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "Notifications",
                    state: { routes: [{ name: "Notifications" }] },
                  },
                ],
              })
            );
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="bell" size={24} color={color} />

              <RedDotNotification />
            </View>
          ),
          tabBarLabel: "Notifications",
          tabBarLabelStyle: { fontSize: formattedWidth * 2.7 },
        }}
      />

   <Tab.Screen
  name="Sell"
  component={R1_SellCarStack}
  options={({ route }) => {
    const routeName =
      route?.state?.routes?.[route.state.index || 0]?.name ?? "SellCar";

    return {
      tabBarStyle: routeName === "Sell" ? styles.tabBar : { display: "none" },
      tabBarButton: (props) => <CustomTabBarButton {...props} />,
    };
  }}
/>


      <Tab.Screen
        name="Messages"
        component={R1_Messages}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "Messages",
                    state: { routes: [{ name: "ChatHeads" }] },
                  },
                ],
              })
            );
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="message-square" size={24} color={color} />
              <RedDotMessages />
            </View>
          ),

          tabBarLabel: "Messages",
          tabBarLabelStyle: { fontSize: formattedWidth * 2.7 },
        }}
      />

      <Tab.Screen
  name="Profile"
  component={R1_Profile}
  listeners={({ navigation }) => ({
    tabPress: (e) => {
      e.preventDefault();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Profile",
              state: { routes: [{ name: "ProfileScreen" }] },
            },
          ],
        })
      );
    },
  })}
  options={({ route }) => {
    const focusedRoute = getFocusedRouteNameFromRoute(route) ?? 'ProfileScreen';
    const isMainScreen = focusedRoute === 'ProfileScreen';

    return {
      tabBarStyle: isMainScreen ? styles.tabBar : { display: 'none' },
      tabBarIcon: ({ color }) => (
        <Icon name="settings" size={24} color={color} />
      ),
      tabBarLabel: "Settings",
      tabBarLabelStyle: { fontSize: formattedWidth * 2.7 },
    };
  }}
/>


    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    // position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: "8%",
    // borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    // paddingBottom:10
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  sellButtonWrapper: {
    position: "absolute",
    marginLeft: 15,
    // backgroundColor: "red",
    top: -25,
    alignItems: "center",
  },
  curvedBackground: {
    position: "absolute",
    top: -10,
    zIndex: -1,
  },
  plusButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
  },
  sellLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2C6BED",
    marginTop: 5,
    textAlign: "center",
    marginRight: 3,
  },
  plusContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#2C6BED",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2C6BED",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
