import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";

export default function PasswordChangeScreen() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title={"Change Password"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.formContainer}>
            <Text style={styles.labelText}>Old Password</Text>
            <Input
              value={oldPassword}
              onChangeText={setOldPassword}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              secureTextEntry={!oldPasswordVisible}
              inputStyle={styles.inputText}
              placeholder="••••••••"
              rightIcon={
                <Icon
                  name={oldPasswordVisible ? "visibility" : "visibility-off"}
                  type="material"
                  size={24}
                  color="#666"
                  onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
                />
              }
            />

            <Text style={styles.labelText}>New Password</Text>
            <Input
              value={newPassword}
              onChangeText={setNewPassword}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              secureTextEntry={!newPasswordVisible}
              inputStyle={styles.inputText}
              placeholder="••••••••"
              rightIcon={
                <Icon
                  name={newPasswordVisible ? "visibility" : "visibility-off"}
                  type="material"
                  size={24}
                  color="#666"
                  onPress={() => setNewPasswordVisible(!newPasswordVisible)}
                />
              }
            />

            <Text style={styles.labelText}>Confirm Password</Text>
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              secureTextEntry={!confirmPasswordVisible}
              inputStyle={styles.inputText}
              placeholder="••••••••"
              rightIcon={
                <Icon
                  name={
                    confirmPasswordVisible ? "visibility" : "visibility-off"
                  }
                  type="material"
                  size={24}
                  color="#666"
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                />
              }
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              style={{ marginBottom: 10 }}
              title="Save Changes"
              onPress={() => console.log("Update Password")}
            />
            <CustomButton
              title="Back"
              style={styles.nextButton}
              textStyle={styles.nextButtonText}
              onPress={() => console.log("Go bAck from changePassword")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  formContainer: {
    width: "100%",
  },
  labelText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    marginLeft: 10,
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 56,
    backgroundColor: "#fff",
  },
  inputText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    alignSelf: "center",
  },
  nextButton: {
    backgroundColor: "transparent",
    borderColor: GlobalStyles.colors.ButtonColor,
    borderWidth: 1,
    marginBottom: 2,
  },
  nextButtonText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: "Inter-SemiBold",
  },
});
