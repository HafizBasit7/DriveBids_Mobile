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
import { useAuth } from "../../../R1_Contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import DialogBox from "../../../CustomComponents/DialogBox";
import { updateProfile } from "../../../API_Callings/R1_API/Auth";

const ProfileEditScreen = () => {

  const {authState, dispatch} = useAuth();
  const user = authState.user;

  const [loading, setLoading] = useState();
  const [message, setMessage] = useState(null);

  const navigation = useNavigation();

  const [formData, setFormData] = useState(user);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveData = async () => {
    setLoading(true);
    try {

      const result = await updateProfile(formData);
      dispatch({
        type: 'setUser',
        payload: result.data.user,
      });
      setMessage({type: 'success', message: 'Profile updated', title: 'Success'});

    }
    catch(e) {
      setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DialogBox
        visible={message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={false}
        title={message?.title || ''}
      />
      <SectionHeader title={"Edit Profile"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' }}
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
        <Text style={styles.profileName}>{user.name}</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              // onChangeText={(text) => handleChange("email", text)}
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
              value={formData.city}
              onChangeText={(text) => handleChange("city", text)}
            />
          </View>
        </View>
        {loading && (
          <ActivityIndicator/>
        )}
        {!loading && (
          <View style={styles.buttonContainer}>
            <CustomButton
              style={{ marginBottom: 10 }}
              title="Save Changes"
              onPress={handleSaveData}
            />
            <CustomButton
              title="Back"
              style={styles.nextButton}
              textStyle={styles.nextButtonText}
              onPress={() => navigation.goBack()}
            />
          </View>
        )}
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
