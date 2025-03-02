import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const [role, setRole] = useState("private");

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <View style={styles.backIconContainer}>
        <BackIcon width={40} height={40} />
      </View>

      {/* Top Background Image */}
      <Image source={require("../assets/signup1.png")} style={styles.bgImageTop} />

      {/* Role Selection Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.fullTabArea}
          onPress={() => setRole("private")}
        >
          <View style={styles.tab}>
            {role === "private" && <View style={styles.activeTabIndicator} />}
            <Text style={styles.tabText}>Private Seller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fullTabArea}
          onPress={() => setRole("trade")}
        >
          <View style={styles.tab}>
            {role === "trade" && <View style={styles.activeTabIndicator} />}
            <Text style={styles.tabText}>Trade Seller</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Conditional Images */}
      {role === "private" ? (
        <>
          <Image source={require("../assets/signup3.png")} style={styles.bgImageBottom} />
          <Image source={require("../assets/signup2.png")} style={styles.bgImageMiddle} />
        </>
      ) : (
        <>
          <Image source={require("../assets/signup2.png")} style={styles.bgImageBottom} />
          <Image source={require("../assets/signup3.png")} style={styles.bgImageMiddle} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  bgImageTop: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: height * 0.4,
  },
  bgImageMiddle: {
    position: "absolute",
    bottom: -100,
    width: "100%",
    height: "80%",
  },
  bgImageBottom: {
    position: "absolute",
    bottom: -100,
    width: "100%",
    height: "80%",
  },
  tabContainer: {
    flexDirection: "row",
    position: "absolute",
    top: height * 0.3,
    width: "100%",
    justifyContent: "space-evenly",
    zIndex: 10,
  },
  fullTabArea: {
    flex: 1,
    alignItems: "center",
  },
  tab: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  
  activeTabIndicator: {
    position: "absolute",
    width: "70%",
    height: 15,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }], // Slight irregularity
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
});

export default SignupScreen;