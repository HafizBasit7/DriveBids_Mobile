import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const CarDetails2 = () => {
  const navigation = useNavigation(); // Initialize navigation

  const {carState, dispatch} = useCar();

  function onChangeCarCity (value) {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field: 'city',
      value,
    });
  };

  const options = [
    { id: 1, label: "New York" },
    { id: 2, label: "Los Angeles" },
    { id: 3, label: "Chicago" },
    { id: 4, label: "Houston" },
    { id: 5, label: "Miami" },
    { id: 6, label: "San Francisco" },
    { id: 7, label: "Dallas" },
    { id: 8, label: "Boston" },
    { id: 9, label: "Seattle" },
    { id: 10, label: "Washington D.C." },
  ];

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 4 of 10</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>City</Text>
        <View style={styles.line} />
      </View>

      {/* Input Field */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search City..."
          placeholderTextColor="#999"
          value={carState.carDetails.city}
          onChangeText={onChangeCarCity}
        />
      </View>

      {/* Clickable List */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChangeCarCity(item.label)}>
            <Text
              style={[
                styles.entityText,
                carState.carDetails.city === item.label && styles.selectedText,
              ]}
            >
              {item.label}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails5")}
        />
        <View style={{ height: 10 }} />
        <CustomButton
          title="Back"
          style={styles.backButton}
          textStyle={{ color: "#007BFF" }}
          onPress={() => navigation.navigate("CarDetails3")}
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
  entityText: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  selectedText: {
    color: "#007BFF", // Blue color for selected text
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 15,
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

export default CarDetails2;
