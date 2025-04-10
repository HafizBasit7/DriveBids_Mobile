import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getMyCarBiddingHistory } from "../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";
import { formatAmount, formatDateTime } from "../../utils/R1_utils";
import { acceptBid } from "../../API_Callings/R1_API/Bid";
import DialogBox from "../DialogBox";

const BiddingList = ({car}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState(null);
  

  const {data, isLoading} = useQuery({
    queryKey: ['biddingHistory', car],
    queryFn: () => getMyCarBiddingHistory(car),
    enabled: isExpanded,
  });

  const mutation = useMutation({
    mutationFn: acceptBid,
  });

  const bids = data?.data?.bids;

  const handlePressAcceptBid = async (bidId) => {
    if(mutation.isPending) return;

    try {
      const result = await mutation.mutateAsync({carId: car, bidId});
      setMessage({type: 'success', message: result.message, title: 'Success'});
    } catch (e) {
      setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    }
  };

  return (
    <View style={styles.container}>

      <DialogBox
        visible={message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={false}
        title={message?.title || ''}
      />

      {/* Header Line */}
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Bidding List</Text>
        <View style={styles.fullLine} />
      </View>

      {(isExpanded && isLoading) && (<ActivityIndicator style={{marginTop: 20}}/>)}
      {(isExpanded && !isLoading && bids && bids.length < 1) && (
              <Text style={{margin:30}}>No Data To Show</Text>
            ) }
      {/* Expandable Content */}
      {(isExpanded && !isLoading && bids && bids.length > 0) && (
        <View style={styles.listContainer}>
          {bids.map((bidder, index) => (
            <View key={bidder._id} style={styles.bidderCard}>
              <Image source={{ uri: bidder.user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' }} style={styles.avatar} />
              <View style={styles.bidDetails}>
                {index === 0 && (
                  <Text style={styles.highestBid}>Highest Bid</Text>
                )}
                <Text style={styles.bidAmount}>Bid: AED {formatAmount(bidder.bidAmount)}</Text>
                <Text style={styles.bidderName}>by {bidder.user.name}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.bidDate}>{formatDateTime(bidder.createdAt)}</Text>
                <TouchableOpacity style={styles.acceptButton} onPress={() => handlePressAcceptBid(bidder._id)}>
                  
                  {mutation.isPending && (<ActivityIndicator color="white"/>)}
                  {!mutation.isPending && (
                    <Text style={styles.acceptText}>Accept</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#2A5DB0"
          style={styles.icon}
        />
        <Text style={styles.dropdownText}>
          {isExpanded ? "Hide Bidding List" : "View Bidding List"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  lineText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  icon: {
    marginRight: 5,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#2A5DB0",
  },
  listContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
  },
  bidderCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  bidDetails: {
    flex: 1,
  },
  highestBid: {
    backgroundColor: "#2A5DB0",
    color: "#fff",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bidderName: {
    fontSize: 14,
    color: "#555",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  bidDate: {
    fontSize: 12,
    color: "#777",
  },
  acceptButton: {
    backgroundColor: "#2A5DB0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 5,
  },
  acceptText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BiddingList;
