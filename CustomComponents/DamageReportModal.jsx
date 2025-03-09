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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Upload from "../../assets/tahirAssets/Upload";
import { GlobalStyles } from "../../Styles/GlobalStyles";
export default DamageReportModal = ({
  styles,
  damageDescription,
  setDamageDescription,
  openGallery,
  selectedImage,
  modalVisible,
  handleSaveDamage,
  dismissModal,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={dismissModal}>
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
              <Text style={styles.modalTitle}>Damage Description</Text>
              <TextInput
                multiline={true}
                style={styles.input}
                placeholder="Provide a description of the damage."
                value={damageDescription}
                onChangeText={setDamageDescription}
              />
              <Text style={{ fontFamily: "Inter-SemiBold" }}>
                {" "}
                Original Damage Image (Optional)
              </Text>
              <TouchableOpacity
                onPress={openGallery}
                style={styles.imageContainer}
              >
                {selectedImage ? (
                  <>
                    <Image
                      source={{ uri: selectedImage }}
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
                onPress={handleSaveDamage}
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
