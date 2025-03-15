import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const BiddingHistory = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header Line */}
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Bidding History</Text>
        <View style={styles.fullLine} />
      </View>

      {/* Expandable Content */}
      {isExpanded && (
        <View style={styles.biddingList}>
          {bids.map((bid, index) => (
            <View key={index} style={styles.bidItem}>
              {index === 0 && (
                <View style={styles.highestBidContainer}>
                  <Text style={styles.highestBidText}>Highest Bid</Text>
                </View>
              )}
              <Text style={styles.bidAmount}>Bid: {bid.amount}</Text>
              <Text style={styles.bidRank}>{bid.rank} Bid</Text>
              <Text style={styles.bidDate}>
                Bided on {bid.date} at {bid.time}
              </Text>
              {index !== bids.length - 1 && <View style={styles.separator} />}
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
          {isExpanded ? "Hide Bidding History" : "View Bidding History"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const bids = [
  { amount: "£30,000", rank: "4th", date: "12 December", time: "12:00PM" },
  { amount: "£28,000", rank: "3rd", date: "12 December", time: "12:00PM" },
  { amount: "£25,000", rank: "2nd", date: "12 December", time: "12:00PM" },
  { amount: "£22,000", rank: "1st", date: "12 December", time: "12:00PM" },
];

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
  biddingList: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bidItem: {
    paddingVertical: 10,
  },
  highestBidContainer: {
    backgroundColor: "#2A5DB0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  highestBidText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  bidAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bidRank: {
    fontSize: 14,
    color: "#555",
  },
  bidDate: {
    fontSize: 12,
    color: "#777",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});

export default BiddingHistory;
