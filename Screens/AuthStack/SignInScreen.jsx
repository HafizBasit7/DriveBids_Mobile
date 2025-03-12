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
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import CustomButton from "../../CustomComponents/CustomButton.js";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../R1_Contexts/authContext.js";

const SignInScreen = () => {

  const {login} = useAuth();
  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clickedIcon, setClickedIcon] = useState(null); // State to track clicked social icon

  const handleLogin = () => {
    login({email, password});
  };

  const handleSocialLogin = (platform) => {
    setClickedIcon(platform);
    console.log(`${platform} Login Clicked`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.innerContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={{ height: "40%", width: "100%" }}>
          <Image
            source={require("../../assets/tahirAssets/AuthPngs/Signin.png")}
            style={styles.topImage}
          />
        </View>

        <View style={styles.overlayContainer}>
          <View style={styles.headingContainer}>
            <View style={styles.activeTabIndicator} />
            <Text style={styles.heading}>Hi, Welcome!</Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: focusedInput === "email" ? "#2F61BF" : "#ccc",
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      focusedInput === "password" ? "#2F61BF" : "#ccc",
                  },
                ]}
                placeholder="Enter your password"
                placeholderTextColor="#888"
                secureTextEntry
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                value={password}
                onChangeText={setPassword}
              />

              <View style={styles.rememberContainer}>
                <BouncyCheckbox
                  size={18}
                  fillColor="#2F61BF"
                  unfillColor="#FFFFFF"
                  text="Remember Me"
                  iconStyle={{ borderColor: "#2F61BF" }}
                  textStyle={styles.checkboxText}
                  isChecked={rememberMe}
                  onPress={(isChecked) => setRememberMe(isChecked)}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgetPass")}
                >
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>

        {/* Bottom Buttons Container */}
        <View style={styles.bottomContainer}>
          <CustomButton title="Login" onPress={handleLogin} />
          <View style={styles.signupContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signupscreen")}
            >
              <Text style={styles.loginLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topImage: {
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1, // Take up remaining space
  },
  headingContainer: {
    alignItems: "Left",
    marginBottom: 10,
    position: "relative",
  },
  activeTabIndicator: {
    marginTop: "2%",
    position: "absolute",
    width: "35%",
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
    fontSize: 18,
    textAlign: "Left",
    marginBottom: 10,
    color: "#000",
    fontFamily: "Inter-SemiBold",
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontFamily: "Inter-Regular",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  forgotPassword: {
    color: "#2F61BF",
    textDecorationLine: "underline",
    fontSize: 12,
    fontFamily: "Inter-Regular",
    marginLeft: -100,
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  accountText: {
    fontSize: 14,
    color: "#000",
  },
  loginLink: {
    fontSize: 14,
    color: "#2F61BF",
    fontFamily: "Inter-Regular",
    textDecorationLine: "underline",
  },
  checkboxText: {
    textDecorationLine: "none",
    color: "#000",
    fontSize: 14,
    marginLeft: -5,
  },
});

export default SignInScreen;
