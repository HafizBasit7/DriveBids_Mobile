import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window");
import MakeModel from "../../CustomComponents/UmairComponents/MakeModel";

import BiddingList from "../../CustomComponents/UmairComponents/BiddingList";
import InspectionReport from "../../CustomComponents/UmairComponents/InspectionReport";

import SellersComment from "../../CustomComponents/UmairComponents/SellersComment";
import SimilarAds from "../../CustomComponents/UmairComponents/SimilarAds";
const MyAdDetails = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.lineContainer}>
          <View style={styles.fullLine} />
          <Text style={styles.lineText}>Car Details</Text>
          <View style={styles.fullLine} />
        </View>

        <View style={styles.boxedLineContainer}></View>
        <MakeModel />
        <BiddingList />
        <InspectionReport />

        {/* <CarFeatures /> */}
        <SellersComment />
        <SimilarAds />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  fullLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
    marginHorizontal: 0,
  },
  lineText: {
    marginHorizontal: 8,
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },

  boxedLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  smallLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#2a5db0",
  },
  centerBox: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 90,
    justifyContent: "center",
  },
  centerText: {
    fontSize: 16,
    color: "#2a5db0",
    fontWeight: "bold",
  },
});

export default MyAdDetails;
