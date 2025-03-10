import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomButton from "../../CustomComponents/CustomButton";
// import { useNavigation } from "@react-navigation/native";
const CarDetails3 = () => {
  //   const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 3 of 10</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Model</Text>
        <View style={styles.line} />
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

export default CarDetails3;
