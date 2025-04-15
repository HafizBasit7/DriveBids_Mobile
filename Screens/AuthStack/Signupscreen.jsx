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
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import CustomButton from "../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../R1_Contexts/authContext";
import DialogBox from "../../CustomComponents/DialogBox";
import { Icon } from "react-native-elements";
import { Modal } from "react-native-paper";
import { Image } from "expo-image";
import {
  loginValidation,
  signupValidation,
  traderSignupValidation,
} from "../../R1_Validations/AuthValidations";
import { validateForm } from "../../utils/validate";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
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

  // Country codes list
  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "Australia" },
  ];

  const handleCountrySelect = (item) => {
    console.log("Selected Country: ", item);
    setCountryCode(item.code);
    setCountryModalVisible(false); // Close the modal
  };

  const handleTermsClick = () => {
    Linking.openURL("https://example.com/terms");
  };

  const handleConditionsClick = () => {
    Linking.openURL("https://example.com/conditions");
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
        backgroundColor={visible ? "rgba(0,0,0,0.7)" : 'transparent'}
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 180} 
    >
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <Text style={styles.label}>Location</Text>
            <GooglePlacesAutocomplete
              placeholder='Enter location'
              enablePoweredByContainer={false}
              fetchDetails={true}
              onPress={(data, details) => {
                const updateLocation = {
                  name: data.description,
                  coordinates: [
                    details.geometry.location.lng,
                    details.geometry.location.lat,
                  ]
                };
                setLocation(updateLocation);
              }}
              onFail={(error) => console.error(error)}
              query={{
                key: 'AIzaSyC2oZNWzhuw6yjImkFYSvZ3miShktBq0gI',
                language: 'en',
              }}
              listViewDisplayed='auto'
              textInputProps={{
                defaultValue: location?.name,
              }}
              styles={{
                textInputContainer: {
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 10,
                  paddingHorizontal: 3,
                  marginBottom: 15,
                },
                listView: {
                  position: 'absolute',
                  top: 55, // Adjust based on input field height
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  zIndex: 1000,
                },
              }}
            />
            {/* <View style={styles.inputWrapper}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your city"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your country"
                value={country}
                onChangeText={setCountry}
              />
            </View> */}

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
                  placeholder="Enter your phone number"
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
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
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
                  style={{ marginTop: 5 }}
                />
              </TouchableOpacity>

              <Text style={styles.checkboxText}>
                I agree to the{"  "}
                <TouchableOpacity onPress={handleTermsClick}>
                  <Text style={styles.clickableText}>terms&conditions</Text>
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
        <CustomButton title="Create Account" onPress={handleLogin} />
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
              <Text style={styles.modalCloseText}>Close </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    height: height * 0.09,
    marginTop: -height * 0.09,
    backgroundColor:"#fff"
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
  },
  activeTabIndicator: {
    // position: "absolute",
    // width: "64%",
    // height: 14,
    // backgroundColor: "green",
    // borderRadius: 10,
    // opacity: 0.6,
    // transform: [{ rotate: "-1deg" }],
    // shadowColor: "#000",
    // shadowOffset: { width: 2, height: 2 },
    // bottom: "35%",
    // zIndex: -1,
  },
  boxText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    backgroundColor:"#fff",

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
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
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
    fontSize: 16,
    color: "#333",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
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
  },
});

export default SignupScreen;
