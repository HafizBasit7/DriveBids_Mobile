import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; // Import the checkbox library
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";
import GoogleIcon from "../assets/UmairAssets/Google.svg";
import FacebookIcon from "../assets/UmairAssets/Facebook.svg";
import AppleIcon from "../assets/UmairAssets/Apple.svg";
import CustomButton from "../CustomComponents/CustomButton.js";

const { width, height } = Dimensions.get("window");

const SignInScreen = () => {
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

      {/* Background Image */}
      <Image
        source={require("../assets/SignInBGImage.png")}
        style={styles.topImage}
      />

      {/* Overlay Image */}
      <View style={styles.overlayContainer}>
        <Image
          source={require("../assets/SignInText.png")}
          style={styles.overlayImage}
        />

        {/* Heading */}
        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Hi, Welcome!</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Email Field */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: focusedInput === "email" ? "#2F61BF" : "black" },
            ]}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />

          {/* Password Field */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: focusedInput === "password" ? "#2F61BF" : "black",
              },
            ]}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
          />

          {/* Remember Me & Forgot Password */}
          <View style={styles.rememberContainer}>
            {/* Remember Me Checkbox */}
            <BouncyCheckbox
              size={18} // Reduced checkbox size
              fillColor="#2F61BF"
              unfillColor="#FFFFFF"
              text="Remember Me"
              iconStyle={{ borderColor: "#2F61BF" }}
              textStyle={{
                textDecorationLine: "none",
                color: "#000",
                fontSize: 12, // Smaller font size
                marginLeft: -5, // Reduce gap between text and checkbox
              }}
              isChecked={rememberMe}
              onPress={(isChecked) => setRememberMe(isChecked)}
            />

            {/* Forgot Password */}
            <Text
              style={styles.forgotPassword}
              onPress={() => console.log("Forgot Password Pressed")}
            >
              Forgot Password?
            </Text>
          </View>
          <View style={styles.socialIconsContainer}>
            <GoogleIcon width={36} height={36} />
            <AppleIcon width={36} height={36} />
            <FacebookIcon width={36} height={36} />
          </View>
          <CustomButton
            title="Login"
            onPress={() => console.log("Login Pressed")}
            style={{ marginTop: 20 }}
          />
          <View style={styles.loginTextContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => console.log("Navigate to Login Screen")}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Login Icons Container */}
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
    height: height * 0.5,
  },
  overlayContainer: {
    width: "100%",
  },
  overlayImage: {
    width: "100%",
    height: "90%",
    marginTop: "30%",
  },
  headingContainer: {
    position: "absolute",
    top: "40%",
    left: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  activeTabIndicator: {
    marginTop: "10%",
    position: "absolute",
    width: "100%",
    height: 18,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
  },

  /* Input Fields Styling */
  inputContainer: {
    position: "absolute",
    top: "45%",
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

  /* Remember Me & Forgot Password */
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2,
    fontSize: 12,
  },
  forgotPassword: {
    color: "#2F61BF",
    textDecorationLine: "underline",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: -100,
  },

  /* Social Icons Styling */
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 30, // Space between icons
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

export default SignInScreen;
