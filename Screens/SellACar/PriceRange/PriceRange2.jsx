import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const PriceRange2 = () => {
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation(); // Initialize navigation
  const { carState, dispatch } = useCar();

  function formatNumberWithCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function setReservedBidPrice(value) {
    // Remove non-numeric characters
    const rawNumber = value.replace(/[^0-9]/g, "");
    
    // Format number with commas
    const formattedNumber = formatNumberWithCommas(rawNumber);

    // Update state in context
    dispatch({
      type: "UPDATE_FIELD",
      section: "carPricing",
      field: "reserveBidPrice",
      value: parseInt(rawNumber) || 0, 
    });

    // Store formatted number for display
    setInputValue(formattedNumber);
  }

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        {/* Step Progress Indicator */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText}>Step 2 of 4</Text>
          <View style={styles.line} />
        </View>

        {/* Section Title */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText2}>Reserved Bid</Text>
          <View style={styles.line} />
        </View>

        {/* Input Container */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>
            Enter reserved bid price for your car
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.currencyText}>AED</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputValue} // Use formatted value
              onChangeText={setReservedBidPrice}
            />
          </View>
        </View>
      </View>

      {/* Buttons Fixed at Bottom */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("PriceRange3")}
        />
        <View style={{ height: 10 }} />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    marginBottom: 35,
    alignSelf: "center",
    fontFamily: "Inter-Regular",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 25,
    height: 80,
    width: "90%",
    justifyContent: "center",
    backgroundColor: "#fff",
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
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3%",
  },
  button: {
    marginBottom: 5,
  },
});

export default PriceRange2;