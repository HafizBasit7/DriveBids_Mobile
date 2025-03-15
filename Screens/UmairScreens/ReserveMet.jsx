import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window"); // Get screen width
import MakeModel from "../../CustomComponents/UmairComponents/MakeModel";
import BidsButtons from "../../CustomComponents/UmairComponents/BidsButtons";
import InspectionReport from "../../CustomComponents/UmairComponents/InspectionReport";
import DamageReportCarousel from "../../CustomComponents/UmairComponents/DamageReportcard";
import BiddingHistory from "../../CustomComponents/UmairComponents/BiddingHistory";
import CarFeatures from "../../CustomComponents/UmairComponents/CarFetauresCard";
import SellersComment from "../../CustomComponents/UmairComponents/SellersComment";
import SimilarAds from "../../CustomComponents/UmairComponents/SimilarAds";
const ReserveMet = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Step Progress Container (Lines should extend fully) */}
        <View style={styles.lineContainer}>
          <View style={styles.fullLine} />
          <Text style={styles.lineText}>Car Details</Text>
          <View style={styles.fullLine} />
        </View>

        {/* Second Line Container with Centered Box */}
        <View style={styles.boxedLineContainer}>
          <View style={styles.smallLine} />
          <View style={styles.centerBox}>
            <Text style={styles.centerText}>RESERVE MET</Text>
          </View>
          <View style={styles.smallLine} />
        </View>
        <MakeModel />
        <BidsButtons />
        <InspectionReport />
        <DamageReportCarousel />
        <BiddingHistory />
        <CarFeatures />
        <SellersComment />
        <SimilarAds />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ensures enough space at the bottom when scrolling
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  /* First Line Container (Full Width) */
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // Space before the next section
    width: width, // Make it full width
  },
  fullLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
    marginHorizontal: 0, // Ensure no gaps at the edges
  },
  lineText: {
    marginHorizontal: 8,
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  /* Second Container with Centered Box */
  boxedLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Keep a small margin from edges
  },
  smallLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#3BBF2F",
  },
  centerBox: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded border
    borderWidth: 1,
    borderColor: "#ccc",
    height: 80, // Increased height
    justifyContent: "center", // Ensure text stays centered vertically
  },
  centerText: {
    fontSize: 14,
    color: "#3BBF2F", // Blue text
    fontWeight: "bold",
  },
});

export default ReserveMet;
