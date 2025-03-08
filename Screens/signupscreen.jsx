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
  Linking, // Import Linking to handle URL opening
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; // Import Checkbox
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg";

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const [selectedTab, setSelectedTab] = useState("private"); // Default tab
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  // Function to handle clicking on "terms" or "conditions"
  const handleTermsClick = () => {
    Linking.openURL("https://example.com/terms"); // Replace with your terms URL
  };

  const handleConditionsClick = () => {
    Linking.openURL("https://example.com/conditions"); // Replace with your conditions URL
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

      {/* Top Image (40% Height) */}
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
        {selectedTab === "private" && (
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

            {/* Checkbox with Label */}
            <View style={styles.checkboxContainer}>
              {/* Checkbox Circle */}
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <BouncyCheckbox
                  size={20}
                  fillColor="#2F61BF"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "#2F61BF" }}
                  isChecked={isChecked}
                  disableBuiltInState={true} // Disable built-in state
                  onPress={() => setIsChecked(!isChecked)}
                />
              </TouchableOpacity>

              {/* Separate Text with Clickable Words */}
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
          </View>
        )}

        {selectedTab === "trade" && (
          <View>
            {/* Content for Trade Seller (You can add content here) */}
            <Text style={styles.tradeText}>Trade Seller Content</Text>
          </View>
        )}
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
    height: height * 0.09, // 10% of screen height
    marginTop: -height * 0.09,
  },
  leftBox: {
    flex: 1,
    backgroundColor: "#F1F1F1", // Light Gray
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 40, // Top Right Border
    position: "relative",
  },
  rightBox: {
    flex: 1,
    backgroundColor: "#D1D1D1", // Slightly Darker Gray
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 40, // Top Left Border
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
    width: "50%",
    height: 14,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    bottom: "35%", // Puts the line over the text
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  contentContainer: {
    width: "100%",
    height: height * 0.8, // Remaining 50% of screen height
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  privateBg: {
    backgroundColor: "#F1F1F1", // Matching Private Seller Tab
  },
  tradeBg: {
    backgroundColor: "#D1D1D1", // Matching Trade Seller Tab
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
    height: 45,
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
    marginTop: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
    textDecorationLine: "none", // Prevents default underline in BouncyCheckbox text
  },
  clickableText: {
    color: "blue", // Blue color for clickable words
    textDecorationLine: "underline", // Underline for clickable words
  },
  tradeText: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    marginTop: 30,
    color: "#444",
    fontFamily: "Inter-Regular",
  },
});

export default SignupScreen;
