import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../../CustomComponents/CustomButton.js";
import { useNavigation } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import DialogBox from "../../CustomComponents/DialogBox.jsx";

const { width, height } = Dimensions.get("window");
const CELL_COUNT = 4;

const CodeScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  // const [isCodeSent, setIsCodeSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(29);
    const [message, setMessage] = useState(null);

  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const handleSendCode = () => {
    if(otp.trim() === "") {
      setMessage({type: 'error', message: 'Enter otp code', title: 'Error'});
      return;
    }
    // if (email.trim() !== "") {
      
    //   let countdown = 29;
    //   const interval = setInterval(() => {
    //     countdown--;
    //     setTimer(countdown);
    //     if (countdown === 0) clearInterval(interval);
    //   }, 1000);
    // } else {
    //   alert("Please enter a valid email address.");
    // }

    navigation.navigate("Reset", {otp});
  };

  return (
    <View style={styles.container}>
       <DialogBox
        visible={message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        title={message?.title || ''}
      />
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={30} height={30} />
      </TouchableOpacity>
      <Image
        source={require("../../assets/tahirAssets/AuthPngs/CheckEmail.png")}
        style={styles.topImage}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Please check your email</Text>
          <Text style={styles.description}>
            We’ve sent a code to your email address
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={otp}
            onChangeText={setOtp}
            cellCount={CELL_COUNT}
            rootStyle={styles.otpContainer}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.otpBox, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
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
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          width: "100%",
          paddingHorizontal: 15,
        }}
      >
        <CustomButton
          title="Verify"
          onPress={handleSendCode}
          style={{ marginTop: 0, marginBottom: 25 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
    height: height * 0.45,
  },
  overlayContainer: {
    width: "100%",
    alignItems: "center",
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Inter-Semibold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  activeTabIndicator: {
    width: "75%",
    height: 12,
    backgroundColor: "yellow",
    borderRadius: 10,
    opacity: 0.6,
    transform: [{ rotate: "-1deg" }],
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
  },
  otpContainer: {
    width: "80%",
    alignSelf: "center",
  },
  otpBox: {
    width: 50,

    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Inter-Semibold",
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    fontFamily: "Inter-Semibold",
    marginRight: 10,
  },
  resendDisabled: {
    color: "#aaa",
  },
  timerText: {
    fontSize: 14,
    color: "red",
    fontFamily: "Inter-Semibold",
  },
});

export default CodeScreen;
