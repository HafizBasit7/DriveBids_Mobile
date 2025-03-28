import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import {useCar} from "../../../R1_Contexts/carContext";

const CarDetails9 = () => {
  const navigation = useNavigation(); // Initialize navigation

  const {carState, dispatch} = useCar();

  const options = [
    { id: 1, label: "Manual" },
    { id: 3, label: "CVT" }, // Continuously Variable Transmission
    { id: 4, label: "DCT" }, // Dual-Clutch Transmission
    { id: 5, label: "AGS" }, // Auto Gear Shift
    { id: 6, label: "AMT" }, // Automated Manual Transmission
    // { id: 7, label: "Torque Converter" },
    // { id: 8, label: "Tiptronic" },
    // { id: 9, label: "Sequential" },
    { id: 10, label: "EV Single-Speed" }, // Electric Vehicle Transmission
  ];

  const toggleSelection = (value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field: 'transmission',
      value,
    });
  };

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 9 of 14</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Transmission</Text>
        <View style={styles.line} />
      </View>

      {/* Clickable List with Checkboxes */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelection(item.label)}>
            <View style={styles.optionContainer}>
              <CheckBox
                checked={carState.carDetails.transmission === item.label}
                onPress={() => toggleSelection(item.label)}
                checkedColor="#007BFF"
              />
              <Text style={styles.entityText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails10")}
        />
        <View style={{ height: 10 }} />
        {/* <CustomButton
          title="Back"
          style={styles.backButton}
          textStyle={{ color: "#007BFF" }}
          onPress={() => navigation.goBack()}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    height: 56,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  entityText: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    
    marginBottom: "3%"
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

export default CarDetails9;
