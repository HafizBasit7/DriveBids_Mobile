import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { TouchableWithoutFeedback } from "react-native";

const PriceRange3 = () => {
  const navigation = useNavigation();
  const { carState, dispatch } = useCar();
  const MAX_SAFE_INTEGER = 9007199254740985;

  // Function to format numbers with commas
  const formatNumberWithCommas = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [formattedBidPrice, setFormattedBidPrice] = useState(
    formatNumberWithCommas(carState.carPricing.buyNowPrice?.toString() || "0")
  );

  // Function to handle input change
  const handleBidInput = (text) => {
    // Remove non-numeric characters
    const rawNumber = text.replace(/[^0-9]/g, "").replace(/^0+/, "");

    // Handle empty input
    if (!rawNumber) {
      setFormattedBidPrice("");
      dispatch({
        type: "UPDATE_FIELD",
        section: "carPricing",
        field: "buyNowPrice",
        value: 0,
      });
      return;
    }

    // Convert to number for validation
    const numberValue = parseInt(rawNumber);

    // Check if the value exceeds the maximum safe integer
    if (numberValue > MAX_SAFE_INTEGER) {
      // Use the maximum safe integer instead
      const maxValueString = MAX_SAFE_INTEGER.toString();
      const formattedMaxValue = formatNumberWithCommas(maxValueString);

      // Update state with maximum value
      setFormattedBidPrice(formattedMaxValue);
      dispatch({
        type: "UPDATE_FIELD",
        section: "carPricing",
        field: "buyNowPrice",
        value: MAX_SAFE_INTEGER,
      });

      // Optional: Show user feedback
      // Alert.alert('Maximum Limit', 'Maximum buy now price is 9,007,199,254,740,991');
    } else {
      // Format the number with commas
      const formattedNumber = formatNumberWithCommas(rawNumber);

      // Update state for display
      setFormattedBidPrice(formattedNumber);
      // Dispatch raw numeric value to context
      dispatch({
        type: "UPDATE_FIELD",
        section: "carPricing",
        field: "buyNowPrice",
        value: numberValue,
      });
    }
  };
  // const handleBidInput = (text) => {
  //   // Remove non-numeric characters
  //   const rawNumber = text.replace(/[^0-9]/g, "").replace(/^0+/, "");

  //   // Format the number with commas
  //   const formattedNumber = formatNumberWithCommas(rawNumber);

  //   // Update state for display
  //   setFormattedBidPrice(formattedNumber);
  //   // Dispatch raw numeric value to context
  //   dispatch({
  //     type: "UPDATE_FIELD",
  //     section: "carPricing",
  //     field: "buyNowPrice",
  //     value: rawNumber ? parseInt(rawNumber) : 0,
  //   });
  // };
  const isBidValid = carState.carPricing.buyNowPrice > 0;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Content */}
        <View style={styles.content}>
          {/* Step Progress Indicator */}
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText}>Step 3 of 4</Text>
            <View style={styles.line} />
          </View>

          {/* Section Title */}
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText2}>Buy Now</Text>
            <View style={styles.line} />
          </View>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>
              Set Buy Now price to allow instant purchase, skipping the bidding
              process.
            </Text>
            <View style={styles.inputBox}>
              <Text style={styles.currencyText}>AED</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formattedBidPrice}
                onChangeText={handleBidInput}
              />
            </View>
          </View>
        </View>

        {/* Buttons Fixed at Bottom */}
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="Next"
            onPress={() => navigation.navigate("PriceRange4")}
            disabled={!isBidValid}
          />
          <View style={{ height: 10 }} />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007BFF",
  },
});

export default PriceRange3;
