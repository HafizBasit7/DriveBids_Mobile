import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // Get screen width

const AdDetails = () => {
  return (
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
          <Text style={styles.centerText}>RESERVE NOT MET</Text>
        </View>
        <View style={styles.smallLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  /* First Line Container (Full Width) */
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30, // Space before the next section
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
    backgroundColor: "#ccc",
  },
  centerBox: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded border
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
    height: 90, // Increased height
    justifyContent: "center", // Ensure text stays centered vertically
  },
  centerText: {
    fontSize: 16,
    color: "#2a5db0", // Blue text
    fontWeight: "bold",
  },
});

export default AdDetails;
