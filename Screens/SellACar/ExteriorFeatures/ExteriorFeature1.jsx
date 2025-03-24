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
import { CheckBox } from "react-native-elements"; // Importing CheckBox
import {useCar} from "../../../R1_Contexts/carContext";

const ExteriorFeature1 = () => {

  const navigation = useNavigation(); // Initialize navigation
  const {carState, dispatch} = useCar();

  const options = [
    { id: 1, label: "Sunroof" },
    { id: 2, label: "Fog Lights" },
    { id: 3, label: "Alloy Wheels" },
    { id: 4, label: "LED Headlights" },
    { id: 5, label: "Rear Spoiler" },
    { id: 6, label: "Roof Rails" },
    { id: 7, label: "Chrome Grille" },
    { id: 8, label: "Daytime Running Lights (DRLs)" },
    { id: 9, label: "Power Folding Mirrors" },
    { id: 10, label: "Rain Sensing Wipers" },
    { id: 10, label: "Parking Sensors" },
    { id: 10, label: "3D Camera" },
    { id: 10, label: "Reverse Camera" },
    { id: 10, label: "Immoblizer" },
  ];

  const toggleSelection = (value) => {
    if(carState.features?.exterior?.includes(value)) {
      dispatch({
        type: 'REMOVE_FEATURE',
        section: 'exterior',
        value,
      });
      return;
    };

    dispatch({
      type: 'UPDATE_FEATURE',
      section: 'exterior',
      value,
    });
  };

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 1 of 2</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Exterior Features</Text>
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
                checked={carState.features?.exterior?.includes(item.label)}
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
          onPress={() => navigation.navigate("InteriorFeature1")}
        />
        <View style={{ height: 10 }} />
        <CustomButton
          title="Back"
          style={styles.backButton}
          textStyle={{ color: "#007BFF" }}
          onPress={() => navigation.goBack()}
        />
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
    height: 55,
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
    paddingVertical: 0.1,
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
    marginTop: 10,
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

export default ExteriorFeature1;
