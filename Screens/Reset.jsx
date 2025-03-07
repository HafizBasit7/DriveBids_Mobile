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
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../CustomComponents/CustomButton.js";

const { width, height } = Dimensions.get("window");

const Reset = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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
        source={require("../assets/UmairAssets/Reset.png")}
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
          <Text style={styles.heading}>Reset password</Text>
          <Text style={styles.description}>
            Please type something you’ll remember
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: focusedInput === "password" ? "#2F61BF" : "black",
              },
            ]}
            placeholder="Must be at least 8 characters"
            placeholderTextColor="#888"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor:
                  focusedInput === "confirmPassword" ? "#2F61BF" : "black",
              },
            ]}
            placeholder="Repeat password"
            placeholderTextColor="#888"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocusedInput("confirmPassword")}
            onBlur={() => setFocusedInput(null)}
          />

          <CustomButton
            title="Reset Password"
            onPress={() =>
              console.log("Reset Password Pressed", {
                password,
                confirmPassword,
              })
            }
            style={{ marginTop: "20%" }}
          />

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
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    width: "100%",
    flexWrap: "wrap",
  },
  activeTabIndicator: {
    marginTop: "2%",
    position: "absolute",
    width: "50%",
    height: 14,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
  },
  inputContainer: {
    position: "absolute",
    top: "50%",
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

export default Reset;
