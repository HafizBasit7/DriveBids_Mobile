import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../CustomComponents/CustomButton.js";

const { width, height } = Dimensions.get("window");

const ForgetPass = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [rememberMe, setRememberMe] = useState(false); // State for checkbox
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Back Icon */}
      <View style={styles.backIconContainer}>
        <BackIcon width={30} height={30} />
      </View>

      {/* Background Image (Maintained Height) */}
      <Image source={require("../assets/Forget.png")} style={styles.topImage} />

      {/* Overlay Image (Full Width) */}
      <View style={styles.overlayContainer}>
        <Image
          source={require("../assets/SignInText.png")}
          style={styles.overlayImage}
        />

        {/* Heading and Description */}
        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Forgot password?</Text>
          <Text style={styles.description}>
            Please enter the email associated with your account to receive a
            4-digit code.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {/* Email Field */}
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: focusedInput === "email" ? "#2F61BF" : "black" },
            ]}
            placeholder="Enter your email address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />

          <CustomButton
            title="Send Code"
            onPress={() => console.log("Login Pressed")}
            style={{ marginTop: "40%" }}
          />
          <View style={styles.loginTextContainer}>
            <Text style={styles.accountText}>Remember password? </Text>
            <TouchableOpacity
              onPress={() => console.log("Navigate to Login Screen")}
            >
              <Text style={styles.loginLink}>Login</Text>
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
  overlayImage: {
    width: "100%",
    height: "100%",
    marginTop: "25%",
  },
  headingContainer: {
    position: "absolute",
    top: "38%", // Adjust to align properly
    left: 20,
    width: "90%",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000", // Change color if needed
  },
  description: {
    fontSize: 16,
    color: "#555", // Softer color for readability
    marginTop: 5,
    width: "90%",
  },
  activeTabIndicator: {
    marginTop: "5%",
    position: "absolute",
    width: "55%",
    height: 12,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }], // Slight irregularity
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
  },

  inputContainer: {
    position: "absolute",
    top: "48%",
    left: "5%",
    width: "90%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },

  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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

export default ForgetPass;
