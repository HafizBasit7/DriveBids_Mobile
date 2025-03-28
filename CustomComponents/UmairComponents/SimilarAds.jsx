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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSimilarCars } from "../../API_Callings/R1_API/Car";
import { getCarsIdInWatchList } from "../../API_Callings/R1_API/Watchlist";

const SimilarAds = ({make}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery({
    queryKey: ['similarCars'],
    queryFn: () => getSimilarCars(1, 10, make),
  });

  
  const {data: carsInWatchList, isLoading: watchlistLoading} = useQuery({
      queryKey: ['carsInWatchList'],
      queryFn: getCarsIdInWatchList,
      enabled: false,
  });


  const cars = data?.data.cars;

  return (
    <View style={styles.container}>
      {/* Header Line */}
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Similar Ads</Text>
        <View style={styles.fullLine} />
      </View>

      {/* Expandable Content */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {cars?.map((ad, index) => (
          <View key={index} style={styles.cardSpacing}>
            <HomeCarCard ad={ad} carsInWatchList={carsInWatchList}/>
          </View>
        ))}
      </ScrollView>

      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        {/* <Icon
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#2A5DB0"
          style={styles.icon}
        />
        <Text style={styles.dropdownText}>
          {isExpanded ? "Hide Similar Ads" : "View Similar Ads"}
        </Text> */}
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
