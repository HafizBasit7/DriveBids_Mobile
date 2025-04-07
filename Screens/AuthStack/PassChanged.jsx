import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// import LottieView from "lottie-react-native";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../../CustomComponents/CustomButton.js";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const PassChanged = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={30} height={30} />
      </TouchableOpacity>

      {/* Full-width top image */}
      <Image
        source={require("../../assets/tahirAssets/AuthPngs/ResetPass.png")}
        style={styles.topImage}
      />

      {/* Content (Now directly below the image) */}
      <View style={styles.contentContainer}>
        {/* Lottie Animation */}
        {/* <LottieView
          source={require("../../assets/UmairAssets/PassAnimation.json")}
          autoPlay
          loop={true}
          style={styles.lottie}
        /> */}

        {/* Heading with Active Tab Indicator */}
        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Password changed</Text>
        </View>

        <Text style={styles.description}>
          Your password has been changed successfully!
        </Text>
      </View>

      {/* Button at the absolute bottom */}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Back to login"
          onPress={() => navigation.navigate("SignInScreen")}
        />

        <View style={styles.loginTextContainer}>
          <Text style={styles.accountText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  topImage: {
    width: "100%",
    height: height * 0.4,
    resizeMode: "cover",
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20, // Ensures content is just below the image
    alignItems: "center",
  },
  // lottie: {
  //   width: 150,
  //   height: 150,
  // },
  headingContainer: {
    alignItems: "center",
    // marginTop: 15,
  },
  activeTabIndicator: {
    marginTop: "8%",
    position: "absolute",
    width: "70%",
    height: 14,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  heading: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    fontFamily: "Inter-Regular",
    marginTop: 5,
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 27,
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  accountText: {
    fontSize: 14,
    color: "#000",
  },
  loginLink: {
    fontSize: 14,
    color: "#2F61BF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default PassChanged;
