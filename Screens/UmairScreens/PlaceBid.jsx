import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import CustomButton from "../../CustomComponents/CustomButton";
import WrapperComponent from "../../CustomComponents/WrapperComponent";
import HomeHeader from "../../CustomComponents/UmairComponents/Homeheader";
import { useMutation } from "@tanstack/react-query";
import { placeBidOnCar } from "../../API_Callings/R1_API/Bid";
import DialogBox from "../../CustomComponents/DialogBox";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PlaceBid = ({ route }) => {
  const [bidAmount, setBidAmount] = useState("");
  const MAX_SAFE_INTEGER = 9007199254740985;

  const [message, setMessage] = useState(null);
  const navigation = useNavigation("");

  const scrollY = useRef(new Animated.Value(0)).current; // Animated Value

  const mutation = useMutation({
    mutationFn: placeBidOnCar,
  });

  const car = route.params.car;

  const minBidPrice = car.highestBid ? car.highestBid + 1 : car.staringBidPrice;

  const handleBidSelection = (amount) => {
    handleBidAmountChange(amount.toString());
  };

  const handlePlaceBid = async () => {
    try {
      const result = await mutation.mutateAsync({
        carId: car._id,
        bidAmount: parseInt(bidAmount.replace(/,/g, "")),
      });

      setMessage({
        type: "success",
        message: result.message,
        title: "Success",
      });
      setBidAmount(0);
    } catch (e) {
      setMessage({
        type: "error",
        message: e.message || e.msg,
        title: "Error",
      });
    }
  };
  const handleBidAmountChange = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, "");

    // If empty, allow it
    if (numericValue === "") {
      setBidAmount("");
      return;
    }

    // Convert to number for comparison
    const numberValue = Number(numericValue);

    // Check if the value exceeds the maximum
    if (numberValue > MAX_SAFE_INTEGER) {
      // Optional: Show alert or toast message
      // Alert.alert('Maximum Limit', 'Maximum bid amount is 9,007,199,254,740,991');
      setBidAmount(MAX_SAFE_INTEGER.toString());
    } else {
      setBidAmount(numericValue);
    }
  };
  return (
    <WrapperComponent>
      <DialogBox
        visible={message ? true : false}
        message={message?.message}
        onOkPress={() => {
          setMessage(null);
          navigation.goBack();
        }}
        type={message?.type}
        loading={false}
        title={message?.title || ""}
      />

      <HomeHeader carId={car._id} scrollY={scrollY} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {/* Main Content */}
          <View style={styles.content}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <View style={styles.line} />
              <Text style={styles.title}>Place your bid</Text>
              <View style={styles.line} />
            </View>

            <Text style={styles.subtitle}>
              When you confirm your bid, it means you're committing to buy this
              car if you're the winning bidder.
            </Text>

            {/* Input Box */}
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>AED</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Bid"
                keyboardType="numeric"
                value={bidAmount}
                onChangeText={handleBidAmountChange}
              />
            </View>

            {/* Warning Text */}
            <Text style={styles.warning}>
              Please bid AED {minBidPrice} or higher.
            </Text>

            {/* Predefined Bid Options */}
            <View style={styles.buttonContainer}>
              {[minBidPrice + 49, minBidPrice + 99, minBidPrice + 249].map(
                (amount, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.bidButton}
                    onPress={() => handleBidSelection(amount)}
                  >
                    <Text style={styles.bidText}>AED {amount}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          {mutation.isPending && (
            <ActivityIndicator style={{ marginBottom: 25 }} />
          )}

          {/* Button at the Bottom */}
          {!mutation.isPending && (
            <View style={styles.buttonWrapper}>
              <CustomButton
                disabled={bidAmount < minBidPrice}
                title={"Place Bid Now"}
                onPress={handlePlaceBid}
              />
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the whole screen usable
    // justifyContent: "space-between", // Pushes content & button apart
    padding: 20,
    paddingBottom: 50,
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
    marginVertical: 15,
    fontWeight: 300,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 65, // Fixed size
    minWidth: 200, // Prevent shrinking
    marginBottom: 5,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "start", // Centers text horizontally
    textAlignVertical: "center",
    width: 200,
  },
  warning: {
    color: "#B3261E",
    fontSize: 13,
    marginVertical: 10,
    marginLeft: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
    gap: 10,
  },
  bidButton: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginHorizontal: 1,
    borderWidth: 1, // Add border width
    borderColor: "#D9D9D9", // Change this to any color you want
  },

  bidText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Inter",
    color: "#2F61BF",
  },
  buttonWrapper: {
    alignItems: "center", // Centers button
    marginTop: 10,
    paddingBottom: 50, // Adds some spacing at the bottom
  },
});

export default PlaceBid;
