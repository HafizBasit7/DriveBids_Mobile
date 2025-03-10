import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import CustomButton from "../../CustomComponents/CustomButton";

const CarDetails10 = () => {
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
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

        {/* Ad Title Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Ad Title <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, { height: 50 }]}
            value={adTitle}
            onChangeText={setAdTitle}
            placeholder="Enter Ad Title"
          />
        </View>

        {/* Ad Description Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Ad Description <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={adDescription}
            onChangeText={setAdDescription}
            placeholder="Enter Ad Description"
            multiline
          />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#F9F9F9",
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

export default CarDetails10;
