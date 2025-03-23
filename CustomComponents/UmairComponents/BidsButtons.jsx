import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BidsButtons = ({
  buyItNowTitle = "BUY IT NOW",
  placeBidTitle = "PLACE BID",
  quickBidTitle = "QUICK BID",
  car
}) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Buy It Now Button */}
      <TouchableOpacity style={[styles.button, styles.outlineButton]}>
        <Text style={styles.blueText}>{buyItNowTitle}</Text>
        <Text style={styles.price}>AED {car.buyNowPrice}</Text>
      </TouchableOpacity>

      {/* Place Bid Button */}
      <TouchableOpacity style={[styles.button, styles.primaryButton]}  onPress={() => navigation.navigate('PlaceBid', {car})}>
        <Text style={styles.primaryText}>{placeBidTitle}</Text>
      </TouchableOpacity>

      {/* Quick Bid Button */}
      <TouchableOpacity style={[styles.button, styles.outlineButton]}>
        <Text style={styles.blueText}>{quickBidTitle}</Text>
        <Text style={styles.price}>AED {car.highestBid ? car.highestBid + 1 : car.staringBidPrice}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "30%",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  primaryButton: {
    backgroundColor: "#2A5DB0",
  },
  blueText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#777", //
  },
  primaryText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#B22222",
  },
});

export default BidsButtons;
