import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native"; // Import Lottie
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../CustomComponents/CustomButton.js";

const { width, height } = Dimensions.get("window");

const PassChanged = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    setIsCodeSent(true);
    console.log("Navigating to Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.backIconContainer}>
        <BackIcon width={30} height={30} />
      </View>

      <Image source={require("../assets/Forget.png")} style={styles.topImage} />

      <View style={styles.overlayContainer}>
        {/* Wrapper to position the overlay image & animation together */}
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/SignInText.png")}
            style={styles.overlayImage}
          />

          {/* Centered Lottie Animation */}
          <View style={styles.lottieContainer}>
            <LottieView
              source={require("../assets/UmairAssets/PassAnimation.json")}
              autoPlay
              loop={true}
              style={styles.lottie}
            />
          </View>
        </View>

        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Password changed</Text>
          <Text style={styles.description}>
            Your password has been changed successfully!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomButton
            title="Back to login"
            onPress={handleSendCode}
            style={{ marginTop: "20%" }}
          />

          {isCodeSent && (
            <Text style={styles.successMessage}>Redirecting to Login...</Text>
          )}

          <View style={styles.loginTextContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => console.log("Navigate to Login Screen")}
            >
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
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
    height: height * 0.45,
  },
  overlayContainer: {
    width: "100%",
  },
  /** New Wrapper to position overlay image & Lottie animation **/
  imageWrapper: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginTop: "25%",
  },
  /** Centering the Lottie animation inside the overlay image **/
  lottieContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 250,
    height: 250,
    marginTop: "30%",
  },
  headingContainer: {
    position: "absolute",
    top: "40%",
    left: 20,
    width: "90%",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginRight: 25,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    width: "90%",
    textAlign: "center",
  },
  activeTabIndicator: {
    marginTop: "5%",
    marginLeft: "12%",
    position: "absolute",
    width: "70%",
    height: 12,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
  },
  inputContainer: {
    position: "absolute",
    top: "70%",
    left: "5%",
    width: "90%",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
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
