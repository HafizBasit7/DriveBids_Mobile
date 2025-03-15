import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomButton from "../../CustomComponents/CustomButton";

const PlaceBid = () => {
  const [bidAmount, setBidAmount] = useState(""); // Empty at start

  const handleBidSelection = (amount) => {
    setBidAmount(amount.toString()); // Set bid when an option is selected
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <View style={styles.line} />
          <Text style={styles.title}>Place your bid</Text>
          <View style={styles.line} />
        </View>

        <Text style={styles.subtitle}>
          When you confirm your bid, it means you’re committing to buy this car
          if you’re the winning bidder.
        </Text>

        {/* Input Box */}
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter bid"
            keyboardType="numeric"
            value={bidAmount}
            onChangeText={setBidAmount}
          />
        </View>

        {/* Warning Text */}
        <Text style={styles.warning}>Please bid $30,100 or higher.</Text>

        {/* Predefined Bid Options */}
        <View style={styles.buttonContainer}>
          {[31000, 30500, 32000].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.bidButton}
              onPress={() => handleBidSelection(amount)}
            >
              <Text style={styles.bidText}>${amount.toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Button at the Bottom */}
      <View style={styles.buttonWrapper}>
        <CustomButton title={"Place Bid Now"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the whole screen usable
    justifyContent: "space-between", // Pushes content & button apart
    padding: 20,
  },
  content: {
    flexGrow: 1, // Allows content to grow and push button down
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc", // Light gray line
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 70, // Fixed size
    minWidth: 200, // Prevent shrinking
  },
  currencySymbol: {
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center", // Centers text horizontally
    textAlignVertical: "center",
  },
  warning: {
    color: "red",
    fontSize: 14,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  bidButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1, // Add border width
    borderColor: "#D9D9D9", // Change this to any color you want
  },

  bidText: {
    fontSize: 16,
    fontFamily: "Inter",
    color: "#2F61BF",
  },
  buttonWrapper: {
    alignItems: "center", // Centers button
    // paddingBottom: 20, // Adds some spacing at the bottom
  },
});

export default PlaceBid;
