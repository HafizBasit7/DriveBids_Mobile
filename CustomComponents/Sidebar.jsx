import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";
import MyAdsIcon from "../assets/SVG/TahirSvgs/my-ads.svg";
import SellCarIcon from "../assets/SVG/TahirSvgs/sell-car.svg";
import MessagesIcon from "../assets/SVG/TahirSvgs/message.svg";
import ProfileIcon from "../assets/SVG/TahirSvgs/profile.svg";
import RightIcon from "../assets/SVG/TahirSvgs/right-icon.svg";

const { width } = Dimensions.get("window");

const Sidebar = () => {
  const tabs = [
    { name: "My Ads", icon: MyAdsIcon },
    { name: "Sell My Car", icon: SellCarIcon },
    { name: "Messages", icon: MessagesIcon },
    { name: "Profile", icon: ProfileIcon },
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.backIconContainer}>
          <BackIcon width={30} height={30} />
        </TouchableOpacity>

        <Image source={require("../assets/mainlogo.png")} style={styles.logo} />

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tab}>
              <View style={styles.leftContent}>
                <tab.icon width={20} height={20} />
                <Text style={styles.tabText}>{tab.name}</Text>
              </View>
              <RightIcon width={24} height={24} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Image directly under tabs, fully aligned left */}
        <Image
          source={require("../assets/SideCar.png")}
          style={styles.bottomImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    width: width * 0.7,
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    top: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: "center",
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: "80%",
    height: "20%",
    contentFit: "contain",
  },
  tabsContainer: {
    width: "100%",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 6,
    marginBottom: 10,
    borderRadius: 8,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  bottomImage: {
    width: "95%",
    height: "22%",
    contentFit: "cover",
    alignSelf: "flex-start",
    marginTop: 5,
    marginLeft: -20,
  },
});

export default Sidebar;
