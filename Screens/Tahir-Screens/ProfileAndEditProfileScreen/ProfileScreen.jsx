import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import { useAuth } from "../../../R1_Contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../CustomComponents/Header";

const ProfileScreen = () => {

  const {logoutUser, authState} = useAuth();
  const navigation = useNavigation();
  const user = authState.user;

  const menuItems = [
    {
      id: "ads",
      title: "My Ads",
      icon: "list",
      iconType: "material",
      iconColor: GlobalStyles.colors.ButtonColor,
      onClick: () => {
        navigation.navigate("MyAds");
      },
    },
    {
      id: "bids",
      title: "My Bids",
      icon: "gavel",
      iconType: "material",
      iconColor: GlobalStyles.colors.ButtonColor,
      onClick: () => {
        navigation.navigate("MyBids");
      },
    },
    {
      id: "completeddeals",
      title: "Completed Deals",
      icon: "directions-car",
      iconType: "material",
      iconColor: GlobalStyles.colors.ButtonColor,
      onClick: () => {
        navigation.navigate("CompletedDeals");
      },
    },
    {
      id: "watchlist",
      title: "Watchlist",
      icon: "favorite",
      iconType: "material",
      iconColor: GlobalStyles.colors.ButtonColor,
      onClick: () => {
        navigation.navigate('WatchList');
      },
    },
    {
      id: "notifications",
      title: "Notification Settings",
      icon: "settings",
      iconType: "material",
      iconColor: GlobalStyles.colors.ButtonColor,
      onClick: () => {
        navigation.navigate('NotificationSettingsScreen');
      },
    },
    {
      id: "changepassword",
      title: "Change Password",
      icon: "key",
      iconType: "material",
      iconColor: GlobalStyles.colors.ButtonColor,
      onClick: () => {
        navigation.navigate('PasswordChangeScreen');
      },
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      icon: "help",
      iconType: "material",
      iconColor: GlobalStyles.colors.ButtonColor,
      onClick: () => {
        navigation.navigate('Terms');
      },
    },
    {
      id: "logout",
      title: "Log Out",
      icon: "logout",
      iconType: "material",
      iconColor: "#dc2626",
      titleColor: "#dc2626",
      onClick: () => {
        logoutUser();
      },
    },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onClick}
    >
      <View style={styles.menuItemLeft}>
        <Icon
          name={item.icon}
          type={item.iconType}
          color={item.iconColor}
          size={24}
          containerStyle={styles.iconContainer}
        />
        <Text
          style={[
            styles.menuItemText,
            item.titleColor ? { color: item.titleColor } : null,
          ]}
        >
          {item.title}
        </Text>
      </View>
      <Icon name="chevron-right" type="material" color="#9ca3af" size={24} />
    </TouchableOpacity>
  );

  return (
    <>
      <Header showSearch={false}/>
      {/* <SectionHeader title={"Profile"} /> */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' }}
            style={styles.profileImage}
            defaultSource={{ uri: "https://i.pravatar.cc/150?img=10" }}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <Icon name="chevron-right" size={24} color="#9ca3af" />
      </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e5e7eb", // Placeholder background
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    color: "#111827",
    marginBottom: 2,
  },
  editProfileText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: GlobalStyles.colors.ButtonColor,
  },
  menuContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    marginBottom: 8,
    borderRadius: 10,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#111827",
  },
});

export default ProfileScreen;
