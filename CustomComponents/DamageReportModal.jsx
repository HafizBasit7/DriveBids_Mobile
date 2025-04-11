import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Upload from "../assets/tahirAssets/Upload";
import { GlobalStyles } from "../Styles/GlobalStyles";
import * as ImagePicker from "expo-image-picker";

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
  const [description, setDescription] = useState('');

  //Gallery
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images" ],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectImage(result.assets[0]);
    }
  };

  const handleSaveDamageReport = () => {
    if(!image && !description) return;
    handleSaveDamage({
      imageUrl: image,
      description,
      damageType: selectedDamage.label,
    });
    resetState();
    
  }

  const resetState = () => {
    setSelectedDamage(damageOptions[0]);
    setSelectImage(null);
    setDescription("");
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
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
                        selectedDamage?.label === option.label && { fontWeight: "700" },
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
                {" "}
                Original Damage Image
              </Text>
              <TouchableOpacity
                onPress={openGallery}
                style={styles.imageContainer}
              >
                {image ? (
                  <>
                    <Image
                      source={{ uri: image.uri }}
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
  );
};
