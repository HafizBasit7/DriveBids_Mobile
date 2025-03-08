import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Icons for check/cross

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
              color={item.completed ? "blue" : "gray"}
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
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  carImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  regNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginVertical: 5,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  statusText: {
    marginLeft: 5,
    fontSize: 14,
    color: "gray",
  },
  checkedText: {
    color: "blue",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default DraftCard;
