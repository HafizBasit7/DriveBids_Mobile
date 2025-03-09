import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Icons for check/cross
import { GlobalStyles } from "../Styles/GlobalStyles";

const DraftCard = ({
  regNumber,
  imageUrl,
  statusList,
  onCompleteRegistration,
}) => {
  return (
    <View style={styles.container}>
      {/* Car Image */}
      <Image source={{ uri: imageUrl }} style={styles.carImage} />

      {/* Registration Number */}
      <Text style={styles.regNumber}>Reg No: {regNumber}</Text>

      {/* Status List (Flex-Wrap Row) */}
      <View style={styles.statusContainer}>
        {statusList.map((item, index) => (
          <View key={index} style={styles.statusItem}>
            <FontAwesome
              name={item.completed ? "check-circle" : "times-circle"}
              size={16}
              color={
                item.completed ? GlobalStyles.colors.ButtonColor : "#6F6F6F"
              }
            />
            <Text
              style={[styles.statusText, item.completed && styles.checkedText]}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onCompleteRegistration}>
        <Text style={styles.buttonText}>Complete Registration</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
    marginTop: 5,

    alignItems: "center",
    paddingBottom: 10,
  },
  carImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  regNumber: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginVertical: 5,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    padding: 10,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
  statusText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#6F6F6F",
  },
  checkedText: {
    color: GlobalStyles.colors.ButtonColor,
    fontWeight: "600",
  },
  button: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 5,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter-Regular",

    fontSize: 16,
  },
});

export default DraftCard;
