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
import { confirmResetPassword } from "../../API_Callings/R1_API/Reset.js";
import DialogBox from "../../CustomComponents/DialogBox.jsx";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const Reset = ({route}) => {

  const {otp} = route.params;

  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const resetPassword = async () => {
    setLoading(true);
    try {
      await confirmResetPassword({otpCode: parseInt(otp), password});
      navigation.navigate("PassChanged");
    }
    catch(e) {
        setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Image
        source={require("../../assets/tahirAssets/AuthPngs/ResetPass.png")}
        style={styles.topImage}
        resizeMode="cover"
      />

      <View style={styles.overlayContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.activeTabIndicator} />
          <Text style={styles.heading}>Reset Password</Text>
        </View>

        <Text style={styles.description}>
          Please type something you’ll remember
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
    style={[
      styles.input,
      {
        borderColor: focusedInput === "password" ? "#2F61BF" : "black",
        paddingRight: 40, 
      },
    ]}
    placeholder="Must be at least 8 characters"
    placeholderTextColor="#888"
    secureTextEntry={!showNewPassword} 
    value={password}
    onChangeText={setPassword}
    onFocus={() => setFocusedInput("password")}
    onBlur={() => setFocusedInput(null)}
  />
  <TouchableOpacity
    onPress={() => setShowNewPassword(!showNewPassword)}
    style={styles.eyeIcon1}
  >
    <Icon
      name={showNewPassword ? "eye-off" : "eye"}
      type="feather" // Feather icons from react-native-elements
      size={22}
      color="#888"
    />
  </TouchableOpacity>

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
    style={[
      styles.input,
      {
        borderColor: focusedInput === "confirmPassword" ? "#2F61BF" : "black",
        paddingRight: 40, // Ensure space for the eye icon
      },
    ]}
    placeholder="Repeat password"
    placeholderTextColor="#888"
    secureTextEntry={!showPassword} // Toggle visibility
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    onFocus={() => setFocusedInput("confirmPassword")}
    onBlur={() => setFocusedInput(null)}
  />
  <TouchableOpacity
    onPress={() => setShowPassword(!showPassword)}
    style={styles.eyeIcon}
  >
    <Icon
      name={showPassword ? "eye-off" : "eye"}
      type="feather" // Feather icons from react-native-elements
      size={22}
      color="#888"
    />
  </TouchableOpacity>
        </View>
      </View>

      {/* Button Section - Fixed at Bottom */}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Reset Password"
          onPress={resetPassword}
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
    height: height * 0.4, 
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
    marginBottom: 5,
  },
  activeTabIndicator: {
    marginTop: "4%",
    position: "absolute",
    width: "61%",
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
    fontFamily: "Inter-Bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    fontFamily: "Inter-Regular",
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
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
    bottom: 25,
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
  eyeIcon: {
    position: "absolute",
    right: 10,
    top:142,
  },
  eyeIcon1: {
    position: "absolute",
    right: 10,
    top: 45,
  },
  
});

export default Reset;



//  return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView
//           contentContainerStyle={styles.scrollView}
//           keyboardShouldPersistTaps="handled"
//         >
//           <DialogBox
//             visible={loading ? true : message ? true : false}
//             message={message?.message}
//             onOkPress={() => setMessage(null)}
//             type={message?.type}
//             loading={loading}
//             title={message?.title || ""}
//           />

//           <StatusBar
//             barStyle="dark-content"
//             backgroundColor="transparent"
//             translucent
//           />

//           {/* Full-width Image at the very top */}
//           <Image
//             source={require("../../assets/tahirAssets/AuthPngs/ResetPass.png")}
//             style={styles.topImage}
//             resizeMode="cover"
//           />

//           {/* Content Section */}
//           <View style={styles.overlayContainer}>
//             {/* Heading */}
//             <View style={styles.headingContainer}>
//               <View style={styles.activeTabIndicator} />
//               <Text style={styles.heading}>Reset Password</Text>
//             </View>

//             <Text style={styles.description}>
//               Please type something you’ll remember
//             </Text>

//             {/* Input Fields */}
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>New Password</Text>
//               <TextInput
//                 style={[
//                   styles.input,
//                   {
//                     borderColor: focusedInput === "password" ? "#2F61BF" : "black",
//                     paddingRight: 40,
//                   },
//                 ]}
//                 placeholder="Must be at least 8 characters"
//                 placeholderTextColor="#888"
//                 secureTextEntry={!showNewPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 onFocus={() => setFocusedInput("password")}
//                 onBlur={() => setFocusedInput(null)}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowNewPassword(!showNewPassword)}
//                 style={styles.eyeIcon1}
//               >
//                 <Icon name={showNewPassword ? "eye-off" : "eye"} type="feather" size={22} color="#888" />
//               </TouchableOpacity>

//               <Text style={styles.label}>Confirm Password</Text>
//               <TextInput
//                 style={[
//                   styles.input,
//                   {
//                     borderColor: focusedInput === "confirmPassword" ? "#2F61BF" : "black",
//                     paddingRight: 40,
//                   },
//                 ]}
//                 placeholder="Repeat password"
//                 placeholderTextColor="#888"
//                 secureTextEntry={!showPassword}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 onFocus={() => setFocusedInput("confirmPassword")}
//                 onBlur={() => setFocusedInput(null)}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <Icon name={showPassword ? "eye-off" : "eye"} type="feather" size={22} color="#888" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Button Section - Fixed at Bottom */}
//           <View style={styles.bottomContainer}>
//             <CustomButton title="Reset Password" onPress={resetPassword} />
//             <View style={styles.loginTextContainer}>
//               <Text style={styles.accountText}>Already have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
//                 <Text style={styles.loginLink}>Log in</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: "center",
//   },
//   topImage: {
//     width: "100%",
//     height: 250,
//   },
//   overlayContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   headingContainer: {
//     alignItems: "flex-start",
//     marginBottom: 5,
//   },
//   activeTabIndicator: {
//     marginTop: "4%",
//     position: "absolute",
//     width: "63%",
//     height: 14,
//     backgroundColor: "yellow",
//     borderRadius: 10,
//     opacity: 0.6,
//     transform: [{ rotate: "-1deg" }],
//     shadowColor: "#000",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   heading: {
//     fontSize: 28,
//     fontFamily: "Inter-Bold",
//     color: "#000",
//   },
//   description: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 20,
//     fontFamily: "Inter-Regular",
//   },
//   inputContainer: {
//     width: "100%",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 10,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     color: "#000",
//     marginBottom: 15,
//   },
//   bottomContainer: {
//     width: "100%",
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   loginTextContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   accountText: {
//     fontSize: 14,
//     color: "#000",
//   },
//   loginLink: {
//     fontSize: 14,
//     color: "#2F61BF",
//     fontWeight: "bold",
//     textDecorationLine: "underline",
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: 10,
//     top: 142,
//   },
//   eyeIcon1: {
//     position: "absolute",
//     right: 10,
//     top: 45,
//   },
// });

// export default Reset;
