import React, { useState } from "react";
import {
  View,
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
import DialogBox from "../../CustomComponents/DialogBox.jsx";
import { Icon } from "react-native-elements";
import { loginValidation } from "../../R1_Validations/AuthValidations.js";
import { Image } from "expo-image";

const SignInScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clickedIcon, setClickedIcon] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      //Validation
      const result = loginValidation.safeParse({ email, password });
      if (!result.success) {
        throw {
          name: "app",
          message: result.error.errors[0].message,
        };
      }
      await login({ email, password });
    } catch (e) {
      setMessage({
        type: "error",
        message: e.message || e.msg,
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    setClickedIcon(platform);
    console.log(`${platform} Login Clicked`);
  };

  const visible = loading ? true : message ? true : false;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.innerContainer}>
        <DialogBox
          visible={visible}
          message={message?.message}
          onOkPress={() => setMessage(null)}
          type={message?.type}
          loading={loading}
          title={message?.title || ""}
        />

        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={{ height: "40%", width: "100%", backgroundColor: "#fff" }}>
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
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none" // Disable automatic capitalization
                autoCorrect={false} // Disable auto-correct for email
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())} // Convert to lowercase
              />

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        focusedInput === "password" ? "#2F61BF" : "#ccc",
                      paddingRight: 40,
                      color: "black",
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    type="feather"
                    size={22}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.rememberContainer}>
                <View style={styles.checkboxWrapper}>
                  <BouncyCheckbox
                    size={18}
                    fillColor="#2F61BF"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "#2F61BF" }}
                    isChecked={rememberMe}
                    disableText={true}
                    onPress={(isChecked) => setRememberMe(isChecked)}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.checkboxText}>Remember Me </Text>
                </View>

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
            <Text style={styles.accountText}>Don’t have an account? </Text>
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
    backgroundColor: "#fff",
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
    flex: 1,
    backgroundColor: "#fff",
  },
  headingContainer: {
    alignItems: "Left",
    marginBottom: 10,
    position: "relative",
  },
  activeTabIndicator: {
    marginTop: "8%",
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
    fontSize: 28,
    textAlign: "Left",
    marginBottom: 10,
    color: "#000",
    marginTop: 15,
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
    color: "#000",
    fontFamily: "Inter-Regular",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Keeps "Forgot Password?" on the right
    width: "100%",
    marginTop: 5,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center", // Aligns checkbox and text properly
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#000",
  },
  forgotPassword: {
    color: "#2F61BF",
    textDecorationLine: "underline",
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 25,
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
    fontWeight: "700",
    fontFamily: "Inter-Regular",
  },
  checkboxText: {
    textDecorationLine: "none",
    color: "#000",
    fontSize: 14,
    marginLeft: -5,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
});

export default SignInScreen;
