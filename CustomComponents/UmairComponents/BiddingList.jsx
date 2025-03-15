import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const bidders = [
  {
    id: 1,
    name: "Jane Cooper",
    bid: "£30,000",
    date: "12 December",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
    highest: true,
  },
  {
    id: 2,
    name: "Esther Howard",
    bid: "£28,000",
    date: "12 December",
    image: "https://via.placeholder.com/50",
    highest: false,
  },
  {
    id: 3,
    name: "Robert Fox",
    bid: "£25,000",
    date: "12 December",
    image: "https://via.placeholder.com/50",
    highest: false,
  },
];

const BiddingList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header Line */}
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Bidding List</Text>
        <View style={styles.fullLine} />
      </View>

      {/* Expandable Content */}
      {isExpanded && (
        <View style={styles.listContainer}>
          {bidders.map((bidder) => (
            <View key={bidder.id} style={styles.bidderCard}>
              <Image source={{ uri: bidder.image }} style={styles.avatar} />
              <View style={styles.bidDetails}>
                {bidder.highest && (
                  <Text style={styles.highestBid}>Highest Bid</Text>
                )}
                <Text style={styles.bidAmount}>Bid: {bidder.bid}</Text>
                <Text style={styles.bidderName}>by {bidder.name}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.bidDate}>Bidded on {bidder.date}</Text>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptText}>Accept</Text>
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
