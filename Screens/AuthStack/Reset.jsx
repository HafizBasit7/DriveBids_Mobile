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
import CustomButton from "../../CustomComponents/CustomButton.js";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Reset = () => {
  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Full-width Image at the very top */}
      <Image
        source={require("../../assets/tahirAssets/AuthPngs/ResetPass.png")}
        style={styles.topImage}
        resizeMode="cover"
      />

      {/* Content Section */}
      <View style={styles.overlayContainer}>
        {/* Heading */}
        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Reset Password</Text>
        </View>

        <Text style={styles.description}>
          Please type something you’ll remember
        </Text>

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
            secureTextEntry={true}
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
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocusedInput("confirmPassword")}
            onBlur={() => setFocusedInput(null)}
          />
        </View>
      </View>

      {/* Button Section - Fixed at Bottom */}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Reset Password"
          onPress={() => navigation.navigate("PassChanged")}
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
  topImage: {
    width: width,
    height: height * 0.4, // Adjust height if needed
    position: "absolute",
    top: 0,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: height * 0.2, // Push content below image
  },
  headingContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
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
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  inputContainer: {
    width: "100%",
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
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
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

export default Reset;
