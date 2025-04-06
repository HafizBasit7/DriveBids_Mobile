import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import R1_SellCarStack from "./R1_SellCarStack";
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import Svg, { Path } from "react-native-svg";
import R1_HomeStack from "./R1_HomeStack";
import R1_Messages from "./R1_Messages";
import R1_Profile from "./R1_Profile";
import R1_Notification from "./R1_Notifications";
import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../API_Callings/R1_API/Auth";
  
//Custom button
const CustomTabBarButton = ({ onPress }) => (
  <View style={styles.sellButtonWrapper}>
      {/* <Svg
        width={90}
        height={85}
        viewBox="0 0 90 75"
        style={styles.curvedBackground}
      >
        <Path d="M0 40 Q45 -35 90 25 V75 H0 Z" fill="white" />
      </Svg> */}

      <TouchableOpacity style={styles.plusButton} onPress={onPress}>
        <View style={styles.plusContainer}>
          <Icon name="plus" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
      <Text style={styles.sellLabel}> Sell</Text>
  </View>
);

//

const RedDotNotification = () => {
  const {data} = useQuery({
    queryKey: ['notificationCount'],
    queryFn: getNotificationCount,
  });
  const count = data?.data.count;

  if(count < 1) {
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
  )
}

const Tab = createBottomTabNavigator();

export default function R1_DashboardStack () {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
                tabBarActiveTintColor: "#2C6BED",
                headerShown: false,
                 backgroundColor: "#fff"
            }}
        >
            <Tab.Screen
                name="Home"
                component={R1_HomeStack}
                options={{
                    tabBarIcon: ({ color }) => (
                      <Icon name="home" size={24} color={color} />
                    ),
                    tabBarLabel: "Home",
                }}
            />

<Tab.Screen
  name="My Ads"
  component={R1_Notification}
  options={{
    tabBarIcon: ({ color }) => (
      <View>
        <Icon name="bell" size={24} color={color} />
        {/* Red Dot for Unread Notifications */}
        <RedDotNotification/>
      </View>
    ),
    tabBarLabel: "Notification",
  }}
/>


            <Tab.Screen
              name="Sell"
              component={R1_SellCarStack}
              options={{
                tabBarButton: (props) => <CustomTabBarButton {...props} />,
              }}
            />

            <Tab.Screen
            
              name="Messages"
              component={R1_Messages}
              options={{
                tabBarIcon: ({ color }) => (
                  <View>
                  <Icon name="message-square" size={24} color={color} />
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
                  </View>
                ),
                
                tabBarLabel: "Messages",
              }}
            />

            <Tab.Screen
              name="Profile"
              component={R1_Profile}
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="settings" size={24} color={color} />
                ),
                tabBarLabel: "Settings",
              }}
            />
        </Tab.Navigator>
    )
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
      height: '8%',
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
    },
    sellLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: "#2C6BED",
      marginTop: 5,
      textAlign: "center",
      marginLeft:5
      
    },
    plusContainer: {
      width: 55,
      height: 55,
      borderRadius: 30,
      backgroundColor: "#2C6BED",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#2C6BED", 
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      marginLeft:10
    },
  });