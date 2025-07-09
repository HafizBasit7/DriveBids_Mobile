import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const MakeModel = ({ car }) => {
  const carDetails = [
    { icon: "pencil-alt", label: "MAKE", value: car.make },
    { icon: "tools", label: "VARIANT", value: car.variant },
    { icon: "car", label: "MODEL", value: car.model },
    { icon: "tachometer-alt", label: "MILEAGE", value: `${car.mileage} KM` },
    { icon: "palette", label: "COLOUR", value: car.color },
    { icon: "id-card", label: "Registration No", value: car.regNo },
    { icon: "cogs", label: "ENGINE", value: `${car.engineSize} CC` },
    { icon: "gas-pump", label: "FUEL", value: car.fuel },
    { icon: "exchange-alt", label: "TRANSMISSION", value: car.transmission },
    { icon: "car-battery", label: "CONDITION", value: car.condition },
    { icon: "users", label: "PREVIOUS OWNERS", value: car.noOfOwners },
    { icon: "horse", label: "Horse Power", value: car.horsePower },
  ];

  return (
    <View style={styles.container}>
      {carDetails.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.iconWrapper}>
            <View style={styles.iconBorder}>
              <FontAwesome5 name={item.icon} size={12} color="#2F61BF" />
            </View>
          </View>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
  },

  item: {
    width: "30%",
    alignItems: "center",
    marginVertical: 10,
  },
  iconWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconBorder: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#2F61BF",
    borderRadius: 12,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    color: "#777",
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  value: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },
});

export default MakeModel;
