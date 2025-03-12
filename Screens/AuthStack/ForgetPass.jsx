import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../../CustomComponents/CustomButton.js";
import { useNavigation } from "@react-navigation/native";
import { sendResetOtp } from "../../API_Callings/R1_API/Reset.js";
import DialogBox from "../../CustomComponents/DialogBox.jsx";

const { width, height } = Dimensions.get("window");

const ForgetPass = () => {
  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState(""); // State for email input
  // const [isCodeSent, setIsCodeSent] = useState(false); // State to check if the code is sent

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSendCode = async () => {
    if (email.trim() === "") {
      setMessage({type: 'error', message: 'Enter email', title: 'Error'});
      return;
    }
    //Send email
    setLoading(true);
    try {
        await sendResetOtp({email});
        navigation.navigate("CodeScreen");
    }
    catch(e) {
        setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
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
              <BackIcon width={30} height={30} />
            </View>
            <View style={styles.topImage}>
              <Image
                source={require("../../assets/tahirAssets/AuthPngs/forgetPassword.png")}
                style={styles.topImage}
              />
            </View>

            <View style={styles.overlayContainer}>
              <View style={styles.headingContainer}>
                <View style={styles.activeTabIndicator} />
                <Text style={styles.heading}>Forgot password?</Text>
                <Text style={styles.description}>
                  Please enter the email associated with your account to receive
                  a 4-digit code.
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        focusedInput === "email" ? "#2F61BF" : "black",
                    },
                  ]}
                  placeholder="Enter your email address"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  value={email}
                  onChangeText={setEmail}
                />

                <CustomButton
                  title="Send Code"
                  onPress={handleSendCode}
                  style={{ marginTop: "40%" }}
                />

                {/* {isCodeSent && (
                  <Text style={styles.successMessage}>
                    Code sent successfully!
                  </Text>
                )} */}

                <View style={styles.loginTextContainer}>
                  <Text style={styles.accountText}>Remember password? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignInScreen")}
                  >
                    <Text style={styles.loginLink}>Login</Text>
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
    justifyContent: "space-between",
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  topImage: {
    width: "100%",
    height: height * 0.45,
  },
  overlayContainer: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
  },

  heading: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    width: "90%",
    fontFamily: "Inter-Regular",
  },
  activeTabIndicator: {
    marginTop: "5%",
    position: "absolute",
    width: "55%",
    height: 12,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Regular",
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
  successMessage: {
    fontSize: 16,
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25
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
