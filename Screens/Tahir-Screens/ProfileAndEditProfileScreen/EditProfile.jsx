import React, { useState } from "react";
import {
  View,
  Text,
  
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon, DropDown } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import CustomButton from "../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import { useAuth } from "../../../R1_Contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Modal } from "react-native";
import DialogBox from "../../../CustomComponents/DialogBox";
import { updateProfile } from "../../../API_Callings/R1_API/Auth";
import Header from "../../../CustomComponents/Header";
import { FlatList } from "react-native-gesture-handler";
import { uploadImage } from "../../../utils/upload";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Image } from "expo-image";

const ProfileEditScreen = () => {


  const [countryModalVisible, setCountryModalVisible] = useState(false);

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+91', country: 'India' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'UAE' },
  { code: '+61', country: 'Australia' },
  { code: '+1', country: 'USA' },
  { code: '+91', country: 'India' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'UAE' },
  { code: '+61', country: 'Australia' },
  // Add more countries here
];

const handleCountrySelect = (item) => {
  setFormData((prev) => ({ 
    ...prev, 
    phoneNumber: {
    ...(formData.phoneNumber || {}), 
    countryCode: Number(item.code.replace('+', ''))
  }
}));
  setCountryModalVisible(false);
};

  const {authState, dispatch} = useAuth();
  const user = authState.user;

  const [loading, setLoading] = useState();
  const [message, setMessage] = useState(null);

  const [imageUploading, setImageUploading] = useState(false);

  // const navigation = useNavigation();

  const [formData, setFormData] = useState(user);
  const [imageModalVisible, setImageModalVisible] = useState(false); 
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => 
      ({ ...prev, [field]: field === 'phoneNumber' ? {...(formData.phoneNumber || {}), phoneNo: Number(value)} : value })
    );
  };

  const handleSaveData = async () => {
    setLoading(true);
    try {
      const updatedData = {...formData};
      if(profileImage) {
        updatedData.imgUrl = profileImage;
      }
      if(!updatedData.businessAddress) {
        delete updatedData['businessAddress'];
      }

      const result = await updateProfile(updatedData);
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
      setProfileImage(null);
    }
  };

  const handleImageSelect = () => {
    setImageModalVisible(true);  // Open modal to choose image
  };

  const handleCamera = async () => {

   const {status} = await ImagePicker.requestCameraPermissionsAsync();
   if (status !== "granted") {
    alert("Sorry, we need camera permissions to make this work!");
    return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) {
      setImageModalVisible(false);
      setImageUploading(true);
      // setProfileImage(response.assets[0].uri);
      try {
        const imageResult = await uploadImage(result.assets[0], 'profile');
        setProfileImage(imageResult);
      }
      catch(e) {
        setMessage({type: 'error', message: 'Error uploading image', title: 'Error'})
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 1,
      });

    if(!result.canceled) {
      setImageModalVisible(false);
      setImageUploading(true);
      // setProfileImage(response.assets[0].uri);
      try {
        const imageResult = await uploadImage(result.assets[0], 'profile');
        setProfileImage(imageResult);
      }
      catch(e) {
        setMessage({type: 'error', message: 'Error uploading image', title: 'Error'})
      } finally {
        setImageUploading(false);
      }
    }  
  };

  const getImgUrl = () => {
    if(profileImage) {
      return profileImage;
    }
    return user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  };

  return (
    <>
      <Header showSearch={false}/>
      <DialogBox
        visible={imageUploading ? true : message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={imageUploading}
        title={message?.title || ''}
      />
      <View style={{backgroundColor:"#fff"}}>       <SectionHeader title={"Edit Profile"} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: getImgUrl() }}
            style={styles.profileImage}
            defaultSource={{ uri: "https://i.pravatar.cc/150?img=10" }}
          />
          <View style={styles.editIconContainer}>
          <TouchableOpacity onPress={handleImageSelect} style={styles.editIconContainer}>
            <Icon name="edit" type="material" size={16} color="#3b82f6" containerStyle={styles.editIcon} />
            
          </TouchableOpacity>
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
            <Text style={styles.label}>Location</Text>
            <GooglePlacesAutocomplete
              placeholder='Enter / Search Location'
              fetchDetails={true}
              onPress={(data, details) => {
                const updateLocation = {
                  name: data.description,
                  coordinates: [
                    details.geometry.location.lng,
                    details.geometry.location.lat,
                  ]
                };
                handleChange('location', updateLocation);
              }}
              onFail={(error) => console.error(error)}
              query={{
                key: 'AIzaSyC2oZNWzhuw6yjImkFYSvZ3miShktBq0gI',
                language: 'en',
              }}
              listViewDisplayed='auto'
              textInputProps={{
                placeholder: formData.location?.name,
              }}
              styles={{
                textInputContainer: {
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 10,
                  paddingHorizontal: 3,
                  marginBottom: 5,
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
            <TouchableOpacity
  style={styles.countryCodePicker}
  onPress={() => setCountryModalVisible(true)}
>
  <Text style={styles.countryCodeText}>+{formData.phoneNumber?.countryCode}</Text>
  <Icon name="arrow-drop-down" type="material" size={20} color="#333" />
</TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                value={(formData.phoneNumber?.phoneNo || 0).toString()}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                keyboardType="phone-pad"
              />
            </View>
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
            {/* <CustomButton
              title="Back"
              style={styles.nextButton}
              textStyle={styles.nextButtonText}
              onPress={() => navigation.goBack()}
            /> */}
          </View>
        )}
      </ScrollView>
      <Modal visible={imageModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select or Take a Photo</Text>
            <TouchableOpacity style={styles.modalItem} onPress={handleCamera}>
              <Icon name="camera" type="material" size={24} color="#3b82f6" />
              <Text style={styles.modalText}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={handleGallery}>
              <Icon name="image" type="material" size={24} color="#3b82f6" />
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
            <Text style={styles.modalText}>{item.country} ({item.code})</Text>
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


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
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
    padding: 4,
    marginRight: 8,
    width: "auto",
    height:50
  },
  countryCodeText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    
  },
  phoneInput: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#3b82f6", 
    borderRadius: 8,
    padding: 12,
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    alignSelf: "center",
    marginBottom:25
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 15,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#2F61BF',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  
  
});

export default ProfileEditScreen;
