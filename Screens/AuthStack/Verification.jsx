import React from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";

const { width, height } = Dimensions.get("window");

const Verification = () => {
  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <View style={styles.backIconContainer}>
        <BackIcon width={30} height={30} />
      </View>

      {/* Background Image (Maintained Height) */}
      <Image
        source={require("../assets/Verification.png")}
        style={styles.topImage}
      />

      {/* Overlay Image (Full Width) */}
      <View style={styles.overlayContainer}>
        <Image
          source={require("../assets/SignInText.png")}
          style={styles.overlayImage}
        />

        {/* Heading Over the Overlay Image */}
        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}> Please check your email </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  topImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: height * 0.42,
  },
  overlayContainer: {
    width: "100%",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    marginTop: "25%",
  },
  headingContainer: {
    position: "absolute",
    top: "38%", // Adjust to align properly
    left: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000", // Change color if needed
  },
  activeTabIndicator: {
    marginTop: "5%",
    position: "absolute",
    width: "100%",
    height: 20,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }], // Slight irregularity
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
  },
});

export default Verification;
