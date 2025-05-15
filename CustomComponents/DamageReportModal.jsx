import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Upload from "../assets/tahirAssets/Upload";
import { GlobalStyles } from "../Styles/GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";

const damageOptions = [
  { label: "Scratches", icon: "gesture", color: "#2D8CFF" },
  { label: "Dents/Cracks", icon: "build", color: "#FEE226" },
  { label: "Rust", icon: "coronavirus", color: "#D35400" },
];

export default DamageReportModal = ({
  styles,
  modalVisible,
  handleSaveDamage,
  dismissModal,
}) => {
  const [selectedDamage, setSelectedDamage] = useState(damageOptions[0]);
  const [image, setSelectImage] = useState(null);
  const [description, setDescription] = useState("");
  const [imageModalVisible, setImageModalVisible] = useState(false);

  //handle gallery image
  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageModalVisible(false);
      setSelectImage(result.assets[0]);
    }
  };

  //handle camera image
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
      setSelectImage(result.assets[0]);
    }
  };

  //Gallery
  const openGallery = async () => {
    setImageModalVisible(true);
  };

  const handleSaveDamageReport = () => {
    if (!image && !description) return;
    handleSaveDamage({
      imageUrl: image,
      description,
      damageType: selectedDamage.label,
    });
    resetState();
  };

  const resetState = () => {
    setSelectedDamage(damageOptions[0]);
    setSelectImage(null);
    setDescription("");
  };

  return (
    <>
      {/* Image selection modal  */}
      <Modal
        visible={imageModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles2.modalOverlay}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="rgba(0,0,0,0.7)"
            translucent
          />

          <View style={styles2.modalContent}>
            <Text style={styles2.modalTitle}>Select or Take a Photo</Text>
            <TouchableOpacity style={styles2.modalItem} onPress={handleCamera}>
              <Icon name="camera" type="material" size={24} color="#3b82f6" />
              <Text style={styles2.modalText}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles2.modalItem} onPress={handleGallery}>
              <Icon name="image" type="material" size={24} color="#3b82f6" />
              <Text style={styles2.modalText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles2.modalCloseButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles2.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisible && !imageModalVisible}
        transparent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={dismissModal}
                  style={{
                    position: "absolute",
                    right: 15,
                    top: 10,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    padding: 5,
                    borderRadius: 5,
                    paddingHorizontal: 6,
                  }}
                >
                  <MaterialIcons name="close" color={"white"} />
                </TouchableOpacity>

                {/* Select damage type */}
                <Text style={styles.modalTitle}>Damage Type</Text>
                <View style={styles.damageSelector}>
                  {damageOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.damageOption,
                        selectedDamage?.label === option.label && {
                          backgroundColor: "#E8F0FF",
                          fontWeight: "700",
                        },
                      ]}
                      onPress={() => setSelectedDamage(option)}
                    >
                      <View
                        style={[
                          {
                            borderColor: "#DADADA",
                            borderWidth: 2,
                            borderRadius: 8,
                            padding: 2,
                          },
                          selectedDamage?.label === option.label && {
                            borderColor: GlobalStyles.colors.ButtonColor,
                            borderWidth: 2,
                          },
                        ]}
                      >
                        <MaterialIcons
                          name={option.icon}
                          size={20}
                          color={option.color}
                        />
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          selectedDamage?.label === option.label && {
                            fontWeight: "700",
                          },
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Damage Description */}
                <Text style={styles.modalTitle}>Damage Description</Text>
                <TextInput
                  multiline={true}
                  style={styles.input}
                  placeholder="Provide a description of the damage."
                  value={description}
                  onChangeText={setDescription}
                />
                <Text style={{ fontFamily: "Inter-SemiBold" }}>
                  Original Damage Image
                </Text>
                <TouchableOpacity
                  onPress={openGallery}
                  style={styles.imageContainer}
                >
                  {image ? (
                    <>
                      <Image source={{ uri: image.uri }} style={styles.image} />
                      <View style={styles.penIconContainer}>
                        <MaterialIcons
                          name="edit"
                          size={20}
                          color={"rgba(230, 230, 230, 0.9)"}
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <Upload />
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: "30%",
                    backgroundColor: GlobalStyles.colors.ButtonColor,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                    borderRadius: 7,
                    paddingVertical: 7,
                    alignSelf: "center",
                  }}
                  onPress={handleSaveDamageReport}
                >
                  <Text
                    style={{
                      fontFamily: "Inter-SemiBold",
                      color: "white",
                    }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles2 = StyleSheet.create({
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
});
