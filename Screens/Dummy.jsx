import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper"; // Ensure you have installed react-native-paper
import Header from "../CustomComponents/Header"; // Adjust the path if needed

const CarDetails1 = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, label: "Toyota" },
    { id: 2, label: "Honda" },
    { id: 3, label: "Ford" },
    { id: 4, label: "BMW" },
    { id: 5, label: "Mercedes" },
  ];

  return (
    <View style={styles.container}>
      {/* Importing Header Component */}
      <Header />

      {/* First Horizontal Line with Centered Text */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 1 of 10</Text>
        <View style={styles.line} />
      </View>

      {/* Second Horizontal Line with Centered Text */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Company</Text>
        <View style={styles.line} />
      </View>

      {/* Scrollable Container for Radio Buttons */}
      <ScrollView style={styles.scrollContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.radioContainer}
            onPress={() => setSelectedOption(option.id)}
          >
            <RadioButton
              value={option.id}
              status={selectedOption === option.id ? "checked" : "unchecked"}
              onPress={() => setSelectedOption(option.id)}
            />
            <Text style={styles.radioText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%", // Ensure spacing between headers
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },
  lineText: {
    marginHorizontal: 4,
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#000",
    fontFamily: "Inter-Regular",
    fontWeight: "700",
  },
  lineText2: {
    marginHorizontal: 4,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#000",
    fontFamily: "Inter-Regular",
    fontWeight: "700",
  },
  scrollContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#007BFF",
    backgroundColor: "#fff",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  radioText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
});

export default CarDetails1;
