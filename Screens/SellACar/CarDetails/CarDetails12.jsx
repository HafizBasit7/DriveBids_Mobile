import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const CarDetails12 = () => {
  const navigation = useNavigation(); 

  const {carState, dispatch} = useCar();

  function onChangeCarCity (value) {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field: 'accidentHistory',
      value,
    });
  };

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

{/* Content */}
<View style={{ flex: 1 }}>
  {/* Step Progress Indicator */}
  <View style={styles.lineContainer}>
    <View style={styles.line} />
    <Text style={styles.lineText}>Step 12 of 14</Text>
    <View style={styles.line} />
  </View>

  {/* Section Title */}
  <View style={styles.lineContainer}>
    <View style={styles.line} />
    <Text style={styles.lineText2}>Accident History</Text>
    <View style={styles.line} />
  </View>

  {/* Input Field */}
  <View style={styles.inputWrapper}>
    <TextInput
      style={[styles.input, { height: 150,textAlignVertical: 'top', textAlign: 'left',paddingTop:15 }]}
      placeholder="Enter accident history..."
      placeholderTextColor="#999"
      value={carState.carDetails.accidentHistory}
      onChangeText={onChangeCarCity}
      multiline
    />
  </View>
</View>

{/* Buttons */}
<View style={styles.buttonContainer}>
  <CustomButton
    style={styles.button}
    title="Next"
    onPress={() => navigation.navigate("CarDetails13")}
    disabled={!carState.carDetails.accidentHistory}
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
  </TouchableWithoutFeedback>
  
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
    // height: 55,
    marginTop: "15%",  },
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

export default CarDetails12;
