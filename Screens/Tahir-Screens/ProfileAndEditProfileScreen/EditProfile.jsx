import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon, DropDown } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import CustomButton from "../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const ProfileEditScreen = () => {
  const [formData, setFormData] = useState({
    fullName: "James Anderson",
    email: "jamesanderson@gmail.com",
    phoneNumber: "01774",
    countryCode: "+880",
    location: "New York",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title={"Edit Profile"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=10" }}
            style={styles.profileImage}
            defaultSource={{ uri: "https://i.pravatar.cc/150?img=10" }}
          />
          <View style={styles.editIconContainer}>
            <Icon
              name="edit"
              type="material"
              size={16}
              color="#3b82f6"
              containerStyle={styles.editIcon}
            />
          </View>
        </View>

        {/* Profile Name */}
        <Text style={styles.profileName}>James Anderson</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity style={styles.countryCodePicker}>
                <Text style={styles.countryCodeText}>
                  {formData.countryCode}
                </Text>
                <Icon
                  name="arrow-drop-down"
                  type="material"
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.phoneInput}
                value={formData.phoneNumber}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => handleChange("location", text)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={{ marginBottom: 10 }}
            title="Save Changes"
            onPress={() => console.log("Next save the data")}
          />
          <CustomButton
            title="Back"
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
            onPress={() => console.log("Go bAck from profile")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    padding: 16,
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e5e7eb",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  editIcon: {
    borderRadius: 8,
  },
  profileName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    color: "#111827",
    marginBottom: 24,
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    width: "100%",
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
    padding: 12,
    marginRight: 8,
    width: 90,
  },
  countryCodeText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    flex: 1,
  },
  phoneInput: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#3b82f6", // Blue border for active input
    borderRadius: 8,
    padding: 12,
    flex: 1,
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

export default ProfileEditScreen;
