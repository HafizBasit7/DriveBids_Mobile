import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { buyNowCar, placeBidOnCar } from "../../API_Callings/R1_API/Bid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";
import DialogBox from "../DialogBox";
import { formatAmount } from "../../utils/R1_utils";
import { getCarBiddingHistory } from "../../API_Callings/R1_API/Car";
import { useAuth } from "../../R1_Contexts/authContext";
import { MaterialIcons } from "@expo/vector-icons";

const BidsButtons = ({
  buyItNowTitle = "BUY IT NOW",
  placeBidTitle = "PLACE BID",
  quickBidTitle = "QUICK BID",
  car,
}) => {
  const navigation = useNavigation();
  const { authState } = useAuth();
  const [message, setMessage] = useState(null);
  const [buyNowDialogVisible, setBuyNowDialogVisible] = useState(false);
  const [showBuyNowTooltip, setShowBuyNowTooltip] = useState(false);
  const [showQuickBidTooltip, setShowQuickBidTooltip] = useState(false);

  useEffect(() => {
    // Close tooltips when clicking anywhere
    const closeTooltips = () => {
      setShowBuyNowTooltip(false);
      setShowQuickBidTooltip(false);
    };

    return () => {
      // Cleanup
    };
  }, []);

  const { data, isLoading: loadingBids } = useQuery({
    queryKey: ["biddingHistory", car._id],
    queryFn: () => getCarBiddingHistory(car._id),
  });
  const bids = data?.data?.bids;
  const bid = bids?.find((c) => c.user === authState.user._id);

  let computedQuickBid = car.highestBid
    ? car.highestBid + 1
    : car.staringBidPrice;
  if (bid) {
    //Self user highest bid
    if (bid.bidAmount === car.highestBid) {
      computedQuickBid = bid.maxBudget + 1;
    }
  }

  const mutation = useMutation({
    mutationFn: placeBidOnCar,
  });

  const buyNowMutation = useMutation({
    mutationFn: buyNowCar,
  });

  const handleQuickBidPress = async () => {
    try {
      const result = await mutation.mutateAsync({
        carId: car._id,
        bidAmount: parseInt(computedQuickBid),
      });
      setMessage({
        type: "success",
        message: result.message,
        title: "Success",
      });
    } catch (e) {
      setMessage({
        type: "error",
        message: e.message || e.msg,
        title: "Error",
      });
    }
  };

  const handleBuyItNow = async () => {
    try {
      setBuyNowDialogVisible(false);
      await buyNowMutation.mutateAsync(car._id);
      setMessage({
        type: "success",
        message: "Succesfully bought!",
        title: "Success",
      });
    } catch (e) {
      setMessage({
        type: "error",
        message: e.message || e.msg,
        title: "Error",
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowBuyNowTooltip(false);
        setShowQuickBidTooltip(false);
      }}
    >
      <View>
        <View style={styles.container}>
          {/* General Message Dialog */}
          <DialogBox
            visible={message ? true : false}
            message={message?.message}
            onOkPress={() => setMessage(null)}
            type={message?.type}
            loading={false}
            title={message?.title || ""}
          />

          {/* Buy Now Confirmation Dialog */}
          <DialogBox
            visible={buyNowDialogVisible}
            message={`Are you sure you want to buy this car for AED ${formatAmount(
              car.buyNowPrice
            )}?`}
            onOkPress={handleBuyItNow}
            onCancelPress={() => setBuyNowDialogVisible(false)}
            title="Confirm Buy Now"
          />

          {/* Buy It Now Button with bottom icon */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={() => setBuyNowDialogVisible(true)}
            >
              {!buyNowMutation.isPending ? (
                <>
                  <Text style={styles.blueText}>{buyItNowTitle}</Text>
                  <Text style={styles.price}>AED</Text>
                  <Text style={styles.price}>
                    {formatAmount(car.buyNowPrice)}
                  </Text>
                </>
              ) : (
                <ActivityIndicator />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoIconBottom}
              onPress={(e) => {
                e.stopPropagation();
                setShowBuyNowTooltip(!showBuyNowTooltip);
                setShowQuickBidTooltip(false);
              }}
            >
              <MaterialIcons name="info-outline" size={16} color="#777" />
            </TouchableOpacity>
            {showBuyNowTooltip && (
              <View style={[styles.tooltip, styles.buyNowTooltip]}>
                <Text style={styles.tooltipText}>
                  Fixed price at which buyers can purchase immediately,
                  bypassing the bidding process.
                </Text>
              </View>
            )}
          </View>

          {/* Place Bid Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate("PlaceBid", { car })}
            >
              <Text style={styles.primaryText}>{placeBidTitle}</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Bid Button with bottom icon */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={handleQuickBidPress}
            >
              {!mutation.isPending ? (
                <>
                  <Text style={styles.blueText}>{quickBidTitle}</Text>
                  <Text style={styles.price}>AED </Text>
                  <Text style={styles.price}>
                    {computedQuickBid.toLocaleString()}
                  </Text>
                </>
              ) : (
                <ActivityIndicator />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoIconBottom}
              onPress={(e) => {
                e.stopPropagation();
                setShowQuickBidTooltip(!showQuickBidTooltip);
                setShowBuyNowTooltip(false);
              }}
            >
              <MaterialIcons name="info-outline" size={16} color="#777" />
            </TouchableOpacity>
            {showQuickBidTooltip && (
              <View style={[styles.tooltip, styles.quickBidTooltip]}>
                <Text style={styles.tooltipText}>
                  Minimum amount to outbid the top bidder, unless they increase
                  their bid again.
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text
          style={{
            color: "black",
            fontWeight: "500",
            textDecorationLine: "underline",
            fontStyle: "italic",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Your offer:
        </Text>
        {!loadingBids && !bid && (
          <View style={styles.container1}>
            <View>
              <Text style={{ color: "#696969" }}>Current bid:</Text>
              <Text style={{ color: "#696969" }}>Total Budget: </Text>
            </View>
            <View>
              <Text style={{ color: "#696969" }}>{0} AED</Text>
              <Text style={{ color: "#696969" }}>{0} AED</Text>
            </View>
          </View>
        )}
        {!loadingBids && bid && (
          <View style={styles.container1}>
            <View>
              <Text style={{ color: "#696969" }}>Current bid:</Text>
              <Text style={{ color: "#696969" }}>Total Budget: </Text>
            </View>
            <View>
              <Text style={{ color: "#696969" }}>
                {bid.bidAmount.toLocaleString()} AED
              </Text>
              <Text style={{ color: "#696969" }}>
                {bid.maxBudget.toLocaleString()} AED
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
  },
  button: {
    height: 60,
    width: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
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
  infoIconBottom: {
    marginTop: 4,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "black",
    padding: 8,
    borderRadius: 4,
    zIndex: 101,
    width: 200,
    // opacity: 0.8,
  },
  buyNowTooltip: {
    top: 70,
    left: "25%", // Adjust horizontal position for Buy Now tooltip
  },
  quickBidTooltip: {
    top: 70,
    right: "25%", // Adjust horizontal position for Quick Bid tooltip
  },
  tooltipText: {
    color: "#fff",
    fontSize: 12,
  },
  container1: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontFamily: "Inter-Regular",
    color: "red",
    width: "100%",
    marginTop: 20,
  },
});

export default BidsButtons;
