import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../Styles/GlobalStyles";

const DialogModal = ({ visible, message, onOkPress, type, title }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onOkPress}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DialogModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: GlobalStyles.colors.primaryText,
    marginBottom: 10,
  },
  message: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  okButtonText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
  },
});
