import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../CustomComponents/CustomButton";

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const [selectedTab, setSelectedTab] = useState("private");
  const [isChecked, setIsChecked] = useState(false);

  const handleTermsClick = () => {
    Linking.openURL("https://example.com/terms");
  };

  const handleConditionsClick = () => {
    Linking.openURL("https://example.com/conditions");
  };

  const handleLogin = () => {
    console.log("Login Pressed");
  };

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

      {/* Top Image */}
      <Image
        source={require("../assets/UmairAssets/SignUp.png")}
        style={styles.topImage}
      />

      {/* Tab Container */}
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[
            styles.leftBox,
            selectedTab === "private" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("private")}
        >
          <Text style={styles.boxText}>Private Seller</Text>
          {selectedTab === "private" && (
            <View style={styles.activeTabIndicator} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.rightBox,
            selectedTab === "trade" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("trade")}
        >
          <Text style={styles.boxText}>Trade Seller</Text>
          {selectedTab === "trade" && (
            <View style={styles.activeTabIndicator} />
          )}
        </TouchableOpacity>
      </View>

      {/* Bottom Container */}
      <View
        style={[
          styles.contentContainer,
          selectedTab === "private" ? styles.privateBg : styles.tradeBg,
        ]}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Enter your email" />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          {/* Extra Input Field for Trade Seller */}
          {selectedTab === "trade" && (
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>
          )}

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
              <BouncyCheckbox
                size={20}
                fillColor="#2F61BF"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "#2F61BF" }}
                isChecked={isChecked}
                disableBuiltInState={true}
                onPress={() => setIsChecked(!isChecked)}
              />
            </TouchableOpacity>

            <Text style={styles.checkboxText}>
              I agree to the{" "}
              <TouchableOpacity onPress={handleTermsClick}>
                <Text style={styles.clickableText}>terms</Text>
              </TouchableOpacity>{" "}
              and{" "}
              <TouchableOpacity onPress={handleConditionsClick}>
                <Text style={styles.clickableText}>conditions</Text>
              </TouchableOpacity>
            </Text>
          </View>

          <CustomButton
            title="Create Account"
            onPress={handleLogin}
            style={{ marginTop: selectedTab === "private" ? "30%" : "4%" }}
          />

          {/* Login Link */}
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
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.09,
    marginTop: -height * 0.09,
  },
  leftBox: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 40,
    position: "relative",
  },
  rightBox: {
    flex: 1,
    backgroundColor: "#D1D1D1",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 40,
    position: "relative",
  },
  selectedTab: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  activeTabIndicator: {
    position: "absolute",
    width: "55%",
    height: 14,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    bottom: "35%",
    zIndex: -1,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  contentContainer: {
    width: "100%",
    height: height * 0.8,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  privateBg: {
    backgroundColor: "#F1F1F1",
  },
  tradeBg: {
    backgroundColor: "#D1D1D1",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontFamily: "Inter-Regular",
  },
  input: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontFamily: "Inter-Regular",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  clickableText: {
    color: "#2F61BF",
    textDecorationLine: "underline",
    position: "relative",
    top: 3,
    fontFamily: "Inter-Regular",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  accountText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Inter-Regular",
  },
  loginLink: {
    fontSize: 14,
    color: "#2F61BF",
    fontFamily: "Inter-Regular",
    textDecorationLine: "underline",
  },
});

export default SignupScreen;
