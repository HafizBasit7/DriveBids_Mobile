import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../R1_Contexts/authContext";
import DialogBox from "../../CustomComponents/DialogBox";
import { Icon } from "react-native-elements";
import { Image } from "expo-image";
import {
  loginValidation,
  signupValidation,
  traderSignupValidation,
} from "../../R1_Validations/AuthValidations";
import { validateForm } from "../../utils/validate";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import OTPModal from "./OtpModal";
import {
  generateEmailVerificationOtp,
  verifyEmailOtp,
} from "../../API_Callings/R1_API/Reset";
const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const { signup } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  //Form state
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  //Trader
  const [businessAddress, setBusinessAddress] = useState();

  const [selectedTab, setSelectedTab] = useState("private");
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation("");
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("+92");

  const [token, setToken] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState();

  // Country codes list
  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "Australia" },
    { code: "+92", country: "Pakistan" },
  ];

  const handleCountrySelect = (item) => {
    // console.log("Selected Country: ", item);
    setCountryCode(item.code);
    setCountryModalVisible(false); // Close the modal
  };

  const handleTermsClick = () => {
    Linking.openURL("https://drivebidz.netlify.app/terms");
  };
  const handleResendOtp = async () => {
    await generateEmailVerificationOtp({ email: email.trim() });
    // console.log(JSON.stringify(res));
  };
  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      await generateEmailVerificationOtp({ email: email.trim() });
      setLoading(false);
      setOtpSent(true);
    } catch (e) {
      setLoading(false);
      if (e?.message === "OTP is already generated, please check your email") {
        setOtpSent(true);
      } else {
        setMessage({
          type: "error",
          message: e.message || e.msg,
          title: "Error",
        });
      }
    }
  };

  const verifyOtp = async (otpNew) => {
    setLoading(true);
    try {
      const result = await verifyEmailOtp({
        email: email.trim(),
        otp: parseInt(otpNew),
      });
      setToken(result.data.token);
      setOtp();
      setLoading(false);
    } catch (e) {
      setMessage({
        type: "error",
        message: e.message || e.msg,
        title: "Error",
      });
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      //Validation
      const body = {
        name,
        phoneNumber: {
          phoneNo: Number(phoneNumber),
          countryCode: Number(countryCode.replace("+", "")),
        },
        location,
        token,
        email: email ? email.trim() : email,
        password: password ? password.trim() : password,
        businessAddress,
        type: selectedTab === "private" ? "individual" : "trader",
      };
      validateForm([signupValidation, loginValidation], body);

      if (body.type === "trader") {
        validateForm([traderSignupValidation], body);
      }
      if (!isChecked) {
        setMessage({
          type: "error",
          message: "Please agree to terms & conditions.",
          title: "Error",
        });
        return;
      }
      await signup(body);
      setMessage({
        type: "success",
        message: "Signup successful, Log in now",
        title: "Success",
      });
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

  const visible = loading ? true : message ? true : false;

  return (
    <View style={styles.container}>
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={() => {
          if (message.type == "success") {
            setMessage(null);
            navigation.navigate("SignInScreen");
          }
          setMessage(null);
        }}
        type={message?.type}
        loading={loading}
        title={message?.title || ""}
      />

      <StatusBar
        barStyle="dark-content"
        backgroundColor={visible ? "rgba(0,0,0,0.7)" : "transparent"}
        translucent
      />

      {/* Back Icon */}
      <View style={styles.backIconContainer}>
        <BackIcon
          width={30}
          height={30}
          onPress={() => navigation.navigate("SignInScreen")}
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
          keyboardVerticalOffset={Platform.OS === "ios" ? 280 : 180}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <Text style={styles.label}>Location</Text>
              <GooglePlacesAutocomplete
                placeholder="City/State"
                textInputProps={{
                  placeholderTextColor: "gray",
                  defaultValue: location?.name,
                }}
                enablePoweredByContainer={false}
                predefinedPlaces={[]}
                predefinedPlacesAlwaysVisible={false}
                fetchDetails={true}
                onPress={(data, details) => {
                  const updateLocation = {
                    name: data.description,
                    coordinates: [
                      details.geometry.location.lng,
                      details.geometry.location.lat,
                    ],
                  };
                  setLocation(updateLocation);
                }}
                onFail={(error) => console.error(error)}
                debounce={200}
                query={{
                  key: "AIzaSyB7uPqMeibItFdpdNa1M4pF0jd6L1xOU7g",
                  language: "en",
                }}
                listViewDisplayed="auto"
                autoFillOnNotFound={false}
                currentLocation={false}
                currentLocationLabel="Current location"
                disableScroll={false}
                enableHighAccuracyLocation={true}
                filterReverseGeocodingByTypes={[]}
                GooglePlacesDetailsQuery={{}}
                GooglePlacesSearchQuery={{
                  rankby: "distance",
                  type: "restaurant",
                }}
                GoogleReverseGeocodingQuery={{}}
                isRowScrollable={true}
                keyboardShouldPersistTaps="always"
                listHoverColor="#ececec"
                listUnderlayColor="#c8c7cc"
                keepResultsAfterBlur={false}
                minLength={0}
                nearbyPlacesAPI="GooglePlacesSearch"
                numberOfLines={1}
                onNotFound={() => {}}
                onTimeout={() =>
                  console.warn("google places autocomplete: request timeout")
                }
                suppressDefaultStyles={false}
                textInputHide={false}
                timeout={20000}
                isNewPlacesAPI={false}
                fields="*"
                styles={{
                  textInputContainer: {
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    paddingHorizontal: 3,
                    marginBottom: 10,
                  },
                  textInput: {
                    height: 46,
                    color: "#333",
                    fontSize: 14,
                    fontWeight: 400,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                  },
                  listView: {
                    backgroundColor: "#fff",
                    marginHorizontal: 2,
                    borderRadius: 10,
                    elevation: 1,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    marginTop: 1,
                  },
                  row: {
                    padding: 13,
                    height: 44,
                    flexDirection: "row",
                  },
                  separator: {
                    height: 0.5,
                    backgroundColor: "#c8c7cc",
                  },
                  description: {
                    fontSize: 14,
                    color: "#555",
                  },
                }}
              />

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                  <TouchableOpacity
                    style={styles.countryCodePicker}
                    onPress={() => setCountryModalVisible(true)}
                  >
                    <Text style={styles.countryCodeText}>{countryCode}</Text>
                    <Icon
                      name="arrow-drop-down"
                      type="material"
                      size={20}
                      color="#333"
                    />
                  </TouchableOpacity>

                  <TextInput
                    style={styles.inputnum}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text.toLowerCase())}
                />
              </View>

              {!otpSent && email && (
                <TouchableOpacity
                  onPress={handleRequestOtp}
                  style={styles.requestOtpButton}
                >
                  <Text style={styles.requestOtpText}>Request OTP</Text>
                </TouchableOpacity>
              )}

              {token && otpSent && (
                <Text
                  style={{
                    color: "#008000",
                    fontWeight: 500,
                    marginBottom: 8,
                    marginTop: -10,
                    fontSize: 12,
                  }}
                >
                  Email Verified
                </Text>
              )}

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
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

              {selectedTab === "trade" && (
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Business Address</Text>
                  <TextInput
                    value={businessAddress}
                    onChangeText={setBusinessAddress}
                    style={styles.input}
                    placeholder="Business Address"
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
                    style={{ marginTop: 5 }}
                  />
                </TouchableOpacity>

                <Text style={styles.checkboxText}>
                  I agree to the{"  "}
                  <TouchableOpacity onPress={handleTermsClick}>
                    <Text style={styles.clickableText}>Terms & Conditions</Text>
                  </TouchableOpacity>
                  {""}
                  <TouchableOpacity onPress={handleTermsClick}>
                    <Text style={styles.clickableText}></Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Bottom Buttons Container */}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Create Account"
          disabled={!isChecked || !token}
          onPress={handleLogin}
        />
        <View style={styles.loginTextContainer}>
          <Text style={styles.accountText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={countryModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country Code</Text>
            <FlatList
              data={countryCodes}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleCountrySelect(item)}
                >
                  <Text style={styles.modalText}>
                    {item.country} ({item.code})
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCountryModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <OTPModal
        visible={!token && otpSent && !loading && !message}
        onClose={() => setOtpSent(false)}
        onSubmit={verifyOtp}
        otp={otp}
        setOtp={setOtp}
        onResendOtp={handleResendOtp}
      />
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
  scrollViewContent: {
    flexGrow: 1,
  },
  topImage: {
    width: "100%",
    height: height * 0.3,
    resizeMode: "cover",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.08,
    marginTop: -height * 0.08,
    backgroundColor: "",
  },
  leftBox: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 45,
    position: "relative",
  },
  rightBox: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#FEE226",
    // borderRadius: 10,
    // borderWidth: 5,
    // borderColor: "#FEE226",
  },

  boxText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",

    shadowColor: "#000",

    paddingBottom: 30,
  },
  privateBg: {
    backgroundColor: "#fff",
  },
  tradeBg: {
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    marginTop: 10,
    flexGrow: 1,
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
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#000",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontFamily: "Inter-Regular",
  },
  inputnum: {
    minWidth: "78%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontFamily: "Inter-Regular",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCodePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 4,
    marginRight: 8,
    width: "auto",
    height: 50,
  },
  countryCodeText: {
    fontSize: 15,
    color: "#333",
  },
  requestOtpButton: {
    backgroundColor: "#f0f4ff", // Light blue background
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2F61BF", // Matching blue border
    marginBottom: 10,
    alignSelf: "flex-end", // Or 'center' if you want it centered
  },
  requestOtpText: {
    color: "#2F61BF",
    textDecorationLine: "none",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  clickableText: {
    color: "#2F61BF",
    textDecorationLine: "underline",
    position: "relative",
    top: 4,
    fontFamily: "Inter-Regular",
  },
  bottomContainer: {
    // position: "absolute",
    bottom: 10,

    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
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
    fontWeight: "700",
  },
  loginLink: {
    fontSize: 14,
    color: "#2F61BF",
    fontFamily: "Inter-Regular",
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 45,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    maxHeight: "70%", // Prevent modal from being too tall
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default SignupScreen;
