import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import Wheel from "../../../assets/tahirAssets/Wheel1";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { uploadImage } from "../../../utils/upload";
import DialogBox from "../../../CustomComponents/DialogBox";
import { Icon } from "react-native-elements";
import { Image } from "expo-image";

const Wheel1 = () => {
  const { carState, dispatch } = useCar();
  const index = 0;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [validationModalVisible, setValidationModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageModalVisible(false);
      setLoading(true);
      try {
        const imgUrl = await uploadImage(result.assets[0]);
        dispatch({
          type: "UPDATE_IMAGE",
          section: "wheels",
          index: index,
          value: { type: "image", url: imgUrl },
        });
      } catch (e) {
        setMessage({
          type: "error",
          message: "Error uploading image",
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
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
        const imgUrl = await uploadImage(result.assets[0], `wheels-${index}`);
        dispatch({
          type: "UPDATE_IMAGE",
          section: "wheels",
          index: index,
          value: { type: "image", url: imgUrl },
        });
      } catch (e) {
        setMessage({
          type: "error",
          message: "Error uploading image",
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openGallery = async () => {
    setImageModalVisible(true);
  };

  const handleNext = () => {
    if (!(carState.images.wheels || [])[index]?.url) {
      setValidationModalVisible(true);
    } else {
      navigation.navigate("Wheel2");
    }
  };

  return (
    <View style={styles.container}>
      {/* Image Selection Modal */}
      <Modal
        visible={imageModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="rgba(0,0,0,0.7)"
              translucent
            />

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

      {/* Validation Modal */}
      <Modal
        visible={validationModalVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Image Required</Text>
            <Text style={styles.validationText}>
              Please upload an image of the wheel to proceed.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setValidationModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={loading}
        title={message?.title || ""}
      />

      <SectionHeader title={"Step 1 of 4"} />
      <View style={{ gap: 20, justifySelf: "center" }}>
        <Text style={styles.text}>
          Take a picture of{" "}
          <Text style={{ fontWeight: "bold" }}>the front driver wheel</Text> as
          illustrated
        </Text>

        <TouchableOpacity onPress={openGallery} style={styles.imageContainer}>
          {(carState.images.wheels || [])[index]?.url ? (
            <>
              <Image
                source={{ uri: (carState.images.wheels || [])[index]?.url }}
                style={styles.image}
              />
              <View style={styles.penIconContainer}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={"rgba(230, 230, 230, 0.9)"}
                />
              </View>
            </>
          ) : (
            <Wheel />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={{ marginBottom: 10 }}
          title="Next"
          onPress={handleNext}
                               disabled={!(carState.images.wheels && carState.images.wheels[index]?.url)}

        />
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
    // fontFamily: "Inter-SemiBold",
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
    marginBottom: "8%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginLeft: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#2F61BF",
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  validationText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginVertical: 10,
    color: "#B3261E",
  },
});

export default Wheel1;
