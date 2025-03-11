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
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../../CustomComponents/CustomButton.js";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const CodeScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(""); // State for email input
  const [isCodeSent, setIsCodeSent] = useState(false); // State to check if the code is sent
  const [otp, setOtp] = useState(["", "", "", ""]); // State for OTP inputs
  const [timer, setTimer] = useState(29); // Countdown timer

  const handleSendCode = () => {
    if (email.trim() !== "") {
      setIsCodeSent(true);
      console.log("Code sent to", email);

      // Start countdown when code is sent
      let countdown = 29;
      const interval = setInterval(() => {
        countdown--;
        setTimer(countdown);
        if (countdown === 0) clearInterval(interval);
      }, 1000);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
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

      <Image
        source={require("../../assets/UmairAssets/Code.png")}
        style={styles.topImage}
      />

      <View style={styles.overlayContainer}>
        <Image
          source={require("../../assets/SignInText.png")}
          style={styles.overlayImage}
        />

        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Please check your email</Text>
          <Text style={styles.description}>
            We’ve sent a code to your email address
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {/* OTP Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          {/* Resend Code & Timer */}
          <View style={styles.resendContainer}>
            <TouchableOpacity onPress={handleSendCode} disabled={timer > 0}>
              <Text
                style={[styles.resendText, timer > 0 && styles.resendDisabled]}
              >
                Send code again
              </Text>
            </TouchableOpacity>
            <Text style={styles.timerText}>
              {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : "00:00"}
            </Text>
          </View>

          <CustomButton
            title="Verify"
            onPress={handleSendCode}
            style={{ marginTop: "40%" }}
          />
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
    top: "38%",
    left: 20,
    width: "90%",
  },
  heading: {
    fontSize: 22,

    color: "#000",
    fontFamily: "Inter-Bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    width: "90%",
    fontFamily: "Inter-Regular",
  },
  activeTabIndicator: {
    marginTop: "2%",
    position: "absolute",
    width: "75%",
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
    top: "50%",
    left: "5%",
    width: "90%",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%", // Adjusted width
    alignSelf: "center",
    marginBottom: 10,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    color: "#2F61BF",
    fontWeight: "bold",
    marginRight: 10, // Space between text and timer
  },
  resendDisabled: {
    color: "#aaa", // Greyed out when disabled
  },
  timerText: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
});

export default CodeScreen;
