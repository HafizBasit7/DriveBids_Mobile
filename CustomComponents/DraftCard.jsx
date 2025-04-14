import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Icons for check/cross
import { GlobalStyles } from "../Styles/GlobalStyles";
import { Image } from "expo-image";

const DraftCard = ({
  item,
  onCompleteRegistration
}) => {

  return (
    <View style={styles.container}>
      {/* Car Image */}
      <Image source={{ uri: 'https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png' }} style={styles.carImage} />

      {/* Registration Number */}
      <Text style={styles.regNumber}>Reg No: {item.regNo}</Text>
{/* //TODO: UNCOMMENT */}
      {/* Status List (Flex-Wrap Row) */}
      {/* <View style={styles.statusContainer}>
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
      </View> */}

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onCompleteRegistration}>
        <Text style={styles.buttonText}>Continue</Text>
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
    elevation: 2,
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
    borderRadius: 10,
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
