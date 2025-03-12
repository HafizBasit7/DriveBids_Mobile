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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {useAuth} from "../../R1_Contexts/authContext";
import DialogBox from "../../CustomComponents/DialogBox";
const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const {signup} = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  //Form state
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Trader
  const [businessAddress, setBusinessAddress] = useState('');

  const [selectedTab, setSelectedTab] = useState("private");
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation("");
  const handleTermsClick = () => {
    Linking.openURL("https://example.com/terms");
  };

  const handleConditionsClick = () => {
    Linking.openURL("https://example.com/conditions");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signup({
        name,
        phoneNumber,
        city,
        country,
        email,
        password,
        businessAddress,
        type: selectedTab === 'private' ? 'individual' : 'trader'
      });
      setMessage({type: 'success', message: 'Signup successful, Log in now', title: 'Success'});
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

      {/* Back Icon */}
      <View style={styles.backIconContainer}>
        <BackIcon
          width={30}
          height={30}
          onPress={() => navigation.navigate("onboardingScreen")}
        />
      </View>

      {/* Top Image */}
      <Image
        source={require("../../assets/UmairAssets/SignUp.png")}
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

      {/* Content Container */}
      <View
        style={[
          styles.contentContainer,
          selectedTab === "private" ? styles.privateBg : styles.tradeBg,
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <ScrollView>
            <View>
              <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName}/>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>City</Text>
                  <TextInput style={styles.input} placeholder="Enter your city" value={city} onChangeText={setCity}/>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Country</Text>
                  <TextInput style={styles.input} placeholder="Enter your country" value={country} onChangeText={setCountry}/>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput style={styles.input} placeholder="Enter your phone number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber}/>
                </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail}/>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password} onChangeText={setPassword}
                />
              </View>

              {/* Extra Input Field for Trade Seller */}
              {selectedTab === "trade" && (
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Business Address</Text>
                  <TextInput
                    value={businessAddress}
                    onChangeText={setBusinessAddress}
                    style={styles.input}
                    placeholder="Enter your business address"
                    
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Bottom Buttons Container */}
      <View style={styles.bottomContainer}>
        <CustomButton title="Create Account" onPress={handleLogin} />
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
    borderTopRightRadius: 45,
    position: "relative",
  },
  rightBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 45,
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
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    marginTop: 10,
    height: height * 0.41,
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
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
