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
import Nodata from "../NoData";

const SimilarAds = ({ make, carId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["similarCars", carId],
    queryFn: () => getSimilarCars(1, 10, carId),
  });

  const { data: carsInWatchList, isLoading: watchlistLoading } = useQuery({
    queryKey: ["carsInWatchList"],
    queryFn: getCarsIdInWatchList,
    enabled: false,
  });

  const cars = data?.data.cars.filter((car) => car._id !== carId);

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Similar Ads</Text>
        <View style={styles.fullLine} />
      </View>

      {cars?.length === 0 ? (
        <Nodata isSimilar={true} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {cars?.map((ad, index) => (
            <View key={index} style={styles.cardSpacing}>
              <HomeCarCard ad={ad} carsInWatchList={carsInWatchList} />
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsExpanded(!isExpanded)}
      ></TouchableOpacity>
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
    paddingHorizontal: 3,
  },
  cardSpacing: {
    marginRight: 10,
  },
});

export default SimilarAds;
