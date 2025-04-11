import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import Exterior from "../../../assets/tahirAssets/exterior6";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { useCar } from "../../../R1_Contexts/carContext";
import { uploadImage } from "../../../utils/upload";
import DialogBox from "../../../CustomComponents/DialogBox";
import { Icon } from "react-native-elements";
const Exterior6 = () => {
  const navigation = useNavigation(); // Initialize navigation

  const {carState, dispatch, draftSave} = useCar();
  const index = 5;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

   const handleGallery = async () => {
     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     if (status !== "granted") {
       alert("Sorry, we need camera roll permissions to make this work!");
       return;
     }
 
     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ["images" ],
       aspect: [4, 3],
       quality: 1,
     });
 
     if (!result.canceled) {
       setImageModalVisible(false);
       setLoading(true);
       try {
         const imgUrl = await uploadImage(result.assets[0]);
 
         dispatch({
           type: 'UPDATE_IMAGE',
           section: "exterior",
           index: index,
           value: {type: 'image', url: imgUrl}
         });
       }
       catch(e) {
         setMessage({type: 'error', message: 'Error uploading image', title: 'Error'})
       } finally {
         setLoading(false);
       }
     }
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
     if (!result.canceled) {
       setImageModalVisible(false);
       setLoading(true);
       try {
         const imgUrl = await uploadImage(result.assets[0], `exterior-${index}`);
 
         dispatch({
           type: 'UPDATE_IMAGE',
           section: "exterior",
           index: index,
           value: {type: 'image', url: imgUrl}
         });
       }
       catch(e) {
         setMessage({type: 'error', message: 'Error uploading image', title: 'Error'})
       } finally {
         setLoading(false);
       }
     }
   };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await draftSave('images', 'exterior');
        setMessage({type: 'success', message: 'Car Saved', title: 'Success'});
    }
    catch(e) {
        setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    } finally {
      setLoading(false);
    }
  };

  const onOk = () => {
    if(message?.type === 'error') {
      setMessage(null);
    } else {
      setMessage(null); navigation.popTo("CarImages");
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={imageModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
                     <StatusBar barStyle="dark-content" backgroundColor='rgba(0,0,0,0.7)' translucent />
          
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
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />

      <SectionHeader title={"Step 6 of 6"} />
      <View style={{ gap: 20, justifySelf: "center" }}>
        <Text style={styles.text}>
          Take a picture of your car from the back as shown below
        </Text>
        <TouchableOpacity onPress={() => setImageModalVisible(true)} style={styles.imageContainer}>
          {(carState.images.exterior || [])[index]?.url ? (
            <>
              <Image source={{ uri: (carState.images.exterior || [])[index]?.url }} style={styles.image} />
              <View style={styles.penIconContainer}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={"rgba(230, 230, 230, 0.9)"}
                />
              </View>
            </>
          ) : (
            <Exterior />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={{ marginBottom: 10 }}
          title="Save"
          onPress={handleSaveDraft}
        />
        {/* <CustomButton
          title="Back"
          style={styles.nextButton}
          textStyle={styles.nextButtonText}
          onPress={() =>navigation.goBack()}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.ScreenBg,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    fontSize: 16,
  },
  imageContainer: {
    maxHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  penIconContainer: {
    position: "absolute",

    backgroundColor: "rgba(22, 23, 24, 0.8)",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
     marginBottom:"8%"
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
    backgroundColor: 'rgba(0,0,0,0.7)',
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

export default Exterior6;
