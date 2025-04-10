import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Nodata = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="database-off" size={60} color="#888" />
      <Text style={styles.text}>No Data Available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Nodata;
