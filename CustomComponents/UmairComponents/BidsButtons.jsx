import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { placeBidOnCar } from "../../API_Callings/R1_API/Bid";
import { useMutation } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";
import DialogBox from "../DialogBox";

const BidsButtons = ({
  buyItNowTitle = "BUY IT NOW",
  placeBidTitle = "PLACE BID",
  quickBidTitle = "QUICK BID",
  car
}) => {

  const navigation = useNavigation();
  const [message, setMessage] = useState(null);
  const [buyNowDialogVisible, setBuyNowDialogVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: placeBidOnCar,
  });

  const handleQuickBidPress = async () => {
    try {
      const result = await mutation.mutateAsync({
        carId: car._id,
        bidAmount: parseInt(car.highestBid ? car.highestBid + 1 : car.staringBidPrice)
      });
      setMessage({ type: 'success', message: result.message, title: 'Success' });
    } catch (e) {
      setMessage({ type: 'error', message: e.message || e.msg, title: 'Error' });
    }
  };

  const handleBuyItNow = async () => {
    try {
      setBuyNowDialogVisible(false);
      const result = await mutation.mutateAsync({
        carId: car._id,
        bidAmount: car.buyNowPrice
      });
      setMessage({ type: 'success', message: result.message, title: 'Success' });
    } catch (e) {
      setMessage({ type: 'error', message: e.message || e.msg, title: 'Error' });
    }
  };

  return (
    <View style={styles.container}>

      {/* General Message Dialog */}
      <DialogBox
        visible={message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={false}
        title={message?.title || ''}
      />

      {/* Buy Now Confirmation Dialog */}
      <DialogBox
        visible={buyNowDialogVisible}
        message={`Are you sure you want to buy this car for AED ${car.buyNowPrice}?`}
        onOkPress={handleBuyItNow}
        onCancelPress={() => setBuyNowDialogVisible(false)}
        title="Confirm Buy Now"
      />

      {/* Buy It Now Button */}
      <TouchableOpacity
        style={[styles.button, styles.outlineButton]}
        onPress={() => setBuyNowDialogVisible(true)}
      >
        <Text style={styles.blueText}>{buyItNowTitle}</Text>
        <Text style={styles.price}>AED {car.buyNowPrice}</Text>
      </TouchableOpacity>

      {/* Place Bid Button */}
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => navigation.navigate('PlaceBid', { car })}
      >
        <Text style={styles.primaryText}>{placeBidTitle}</Text>
      </TouchableOpacity>

      {/* Quick Bid Button */}
      <TouchableOpacity
        style={[styles.button, styles.outlineButton]}
        onPress={handleQuickBidPress}
      >
        {!mutation.isPending ? (
          <>
            <Text style={styles.blueText}>{quickBidTitle}</Text>
            <Text style={styles.price}>AED {car.highestBid ? car.highestBid + 1 : car.staringBidPrice}</Text>
          </>
        ) : (
          <ActivityIndicator />
        )}
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
    color: "#777",
  },
  primaryText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#B22222",
  },
});

export default BidsButtons;
