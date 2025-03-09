import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { RadioButton } from "react-native-paper"; // Ensure you have installed react-native-paper
import Header from "../CustomComponents/Header"; // Adjust the path if needed
import CustomButton from "../CustomComponents/CustomButton";

const CarDetails1 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const options = [
    { id: 1, label: "Toyota" },
    { id: 2, label: "Honda" },
    { id: 3, label: "Ford" },
    { id: 4, label: "BMW" },
    { id: 5, label: "Mercedes" },
    { id: 6, label: "Toyota" },
    { id: 7, label: "Honda" },
    { id: 8, label: "Ford" },
    { id: 9, label: "BMW" },
    { id: 10, label: "Mercedes" },
  ];

  return (
    <View style={styles.container}>
      {/* Importing Header Component */}
      <Header />

      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 1 of 10</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Company</Text>
        <View style={styles.line} />
      </View>

      {/* Scrollable Radio Buttons */}
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

      {/* Input Field with Right-Side Text */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter custom company"
          placeholderTextColor="#999"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Text style={styles.inputText}>SELECT</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.button} title="Next" />
        <View style={{ height: 10 }} />
        <CustomButton
          title="Back"
          style={styles.backButton}
          textStyle={{ color: "#007BFF" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20, // Prevents content from being cut off
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%", // Ensures spacing between headers
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
    fontWeight: "700",
  },
  lineText2: {
    marginHorizontal: 4,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  scrollContainer: {
    flexGrow: 0, // Prevents ScrollView from taking up excess space
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    marginLeft: 10,
  },
  radioText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    height: 55, // Ensure box-like structure
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  inputText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },
  button: {
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007BFF",
  },
});

export default CarDetails1;
