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
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import GoogleIcon from "../../assets/UmairAssets/Google.svg";
import FacebookIcon from "../../assets/UmairAssets/Facebook.svg";
import AppleIcon from "../../assets/UmairAssets/Apple.svg";
import CustomButton from "../../CustomComponents/CustomButton.js";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clickedIcon, setClickedIcon] = useState(null); // State to track clicked social icon

  const handleLogin = () => {
    console.log("Login Pressed with Email:", email, "Password:", password);
  };

  const handleSocialLogin = (platform) => {
    setClickedIcon(platform);
    console.log(`${platform} Login Clicked`);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />

            <View style={styles.backIconContainer}>
              <BackIcon
                width={30}
                height={30}
                onPress={() => navigation.navigate("onboardingScreen")}
              />
            </View>

            <Image
              source={require("../../assets/SignInBGImage.png")}
              style={styles.topImage}
            />

            <View style={styles.overlayContainer}>
              <Image
                source={require("../../assets/SignInText.png")}
                style={styles.overlayImage}
              />

              <View style={styles.headingContainer}>
                <View style={styles.activeTabIndicator} />
                <Text style={styles.heading}>Hi, Welcome!</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        focusedInput === "email" ? "#2F61BF" : "black",
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
                        focusedInput === "password" ? "#2F61BF" : "black",
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
                    textStyle={{
                      textDecorationLine: "none",
                      color: "#000",
                      fontSize: 12,
                      marginLeft: -5,
                    }}
                    isChecked={rememberMe}
                    onPress={(isChecked) => setRememberMe(isChecked)}
                  />
                  <Text
                    style={styles.forgotPassword}
                    onPress={() => navigation.navigate("ForgetPass")}
                  >
                    Forgot Password?
                  </Text>
                </View>
                <View style={styles.socialIconsContainer}>
                  <TouchableOpacity onPress={() => handleSocialLogin("Google")}>
                    <GoogleIcon width={36} height={36} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSocialLogin("Apple")}>
                    <AppleIcon width={36} height={36} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSocialLogin("Facebook")}
                  >
                    <FacebookIcon width={36} height={36} />
                  </TouchableOpacity>
                </View>
                <CustomButton
                  title="Login"
                  onPress={handleLogin}
                  style={{ marginTop: 10 }}
                />
                <View style={styles.loginTextContainer}>
                  <Text style={styles.accountText}>
                    Don’t have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Signupscreen")}
                  >
                    <Text style={styles.loginLink}> Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "red",
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
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2,
  },
  forgotPassword: {
    color: "#2F61BF",
    textDecorationLine: "underline",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: -100,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 30,
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
