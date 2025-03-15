import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeCarCard from "../Tahir-Components/Home/HomeCarCard";

const SimilarAds = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header Line */}
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Similar Ads</Text>
        <View style={styles.fullLine} />
      </View>

      {/* Expandable Content */}
      {isExpanded && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {similarAds.map((ad, index) => (
            <View key={index} style={styles.cardSpacing}>
              <HomeCarCard {...ad} />
            </View>
          ))}
        </ScrollView>
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
          {isExpanded ? "Hide Similar Ads" : "View Similar Ads"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const similarAds = [
  {
    image: "https://via.placeholder.com/250",
    name: "Tesla Model S",
    year: 2022,
    engine: 1000,
    transmission: "Autom",
    topBid: 45000,
    timeLeft: "2h 30m",
    favorite: true,
    winning: false,
    yourBid: 42000,
    isFromMyBids: true,
    onViewPress: () => alert("View Ad Pressed"),
    onIncreaseBid: () => alert("Increase Bid Pressed"),
    onCancelBid: () => alert("Cancel Bid Pressed"),
  },
  {
    image: "https://via.placeholder.com/250",
    name: "BMW i8",
    year: 2021,
    engine: 1500,
    transmission: "Auto",
    topBid: 50000,
    timeLeft: "3h 15m",
    favorite: false,
    winning: true,
    yourBid: 47000,
    isFromMyBids: false,
    onViewPress: () => alert("View Ad Pressed"),
    onIncreaseBid: () => alert("Increase Bid Pressed"),
    onCancelBid: () => alert("Cancel Bid Pressed"),
  },
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
  scrollView: {
    marginTop: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 10, // Adds padding on both sides
  },
  cardSpacing: {
    marginRight: 10, // Adds spacing between cards
  },
});

export default SimilarAds;
