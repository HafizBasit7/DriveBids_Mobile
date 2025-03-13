import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
const PriceRange1 = () => {
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation(); // Initialize navigation
  const {carState, dispatch} = useCar();

  function setStartingBidPrice (value) {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carPricing',
      field: 'staringBidPrice',
      value: parseInt(value),
    });
  };

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 1 of 4</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Starting Bid</Text>
        <View style={styles.line} />
      </View>

      {/* Input Container */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>
          Enter starting bid price for your car
        </Text>
        <View style={styles.inputBox}>
          <Text style={styles.currencyText}>AED</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={(carState.carPricing.staringBidPrice || 0).toString() || 0}
            onChangeText={setStartingBidPrice}
          />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("PriceRange2")}
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
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  inputHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    alignSelf: "center",
    fontFamily: "Inter-Regular",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 100,
    width: "60%",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  currencyText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 26,
    color: "#000",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: "40%",
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

export default PriceRange1;
