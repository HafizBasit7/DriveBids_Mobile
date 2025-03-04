import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import BannerCar from "../assets/UmairAssets/BannerCar.svg"; // Ensure correct path

const { width, height } = Dimensions.get("window");

const HomeBanner = () => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.leftSide}>
            <Text style={styles.text}>Sell Now</Text>
          </View>
          <View style={styles.rightSide}>
            <BannerCar width={150} height={100} style={styles.carImage} />
          </View>
        </View>

        {/* New Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.bottomLeft}>
            <Text style={styles.bottomText}>
              Get the best deal for your car instantly
            </Text>
          </View>
          <View style={styles.bottomRight}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: height * 0.25, // Increased height for the new section
    backgroundColor: "#FEE226",
    borderRadius: 20,
    // marginTop: 50,
    padding: 15,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSide: {
    flex: 1,
    marginTop: -50,
  },
  rightSide: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  carImage: {
    position: "relative",
    left: 10,
    top: -35,
    transform: [{ scaleX: Platform.OS === "ios" ? -1 : 1 }],
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold", // Ensure the font is properly loaded
  },

  // New Bottom Section
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  bottomLeft: {
    flex: 1,
  },
  bottomRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  bottomText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
});

export default HomeBanner;
