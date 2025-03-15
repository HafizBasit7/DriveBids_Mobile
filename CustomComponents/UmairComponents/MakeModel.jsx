import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // ✅ Import icons

const carDetails = [
  { icon: "pencil-alt", label: "MAKE", value: "Ford" },
  { icon: "tools", label: "VARIANT", value: "Mustang" },
  { icon: "car", label: "BODYTYPE", value: "Sedan" },
  { icon: "tachometer-alt", label: "MILEAGE", value: "200,000" },
  { icon: "palette", label: "COLOUR", value: "Red" },
  { icon: "id-card", label: "REGISTERED", value: "1996, California" },
  { icon: "cogs", label: "ENGINE", value: "Mustang" },
  { icon: "gas-pump", label: "FUEL", value: "Sedan" },
  { icon: "exchange-alt", label: "TRANSMISSION", value: "Manual" },
];

const MakeModel = () => {
  return (
    <View style={styles.container}>
      {carDetails.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.iconWrapper}>
            <View style={styles.iconBorder}>
              <FontAwesome5 name={item.icon} size={16} color="#2F61BF" />
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
    width: "30%", // Three items per row
    alignItems: "center",
    marginVertical: 10,
  },
  iconWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconBorder: {
    backgroundColor: "#fff",
    borderWidth: 4, // ✅ Blue Border
    borderColor: "#2F61BF",
    borderRadius: 12, // ✅ Circular Border
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#777",
    fontWeight: "bold",
    marginTop: 5,
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});

export default MakeModel;
