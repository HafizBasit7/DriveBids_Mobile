import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const InspectionReport = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Inspection Report</Text>
        <View style={styles.fullLine} />
      </View>

      {isExpanded && (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Symbols</Text>
            <View style={styles.cardContent}>
              {renderItem("check-circle", "green", "Ok")}
              {renderItem("block", "gray", "Not Tested")}
              {renderItem("error", "orange", "Requires Some Attention")}
              {renderItem(
                "error-outline",
                "red",
                "Requires Immediate Attention"
              )}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Dynamic Operations</Text>
            <View style={styles.cardContent}>
              {renderItem("check-circle", "green", "Brake Efficiency Test")}
              {renderItem("error", "orange", "Static Gear Selection")}
              {renderItem("error-outline", "red", "Reverse Clutch Slip Test")}
              {renderItem("check-circle", "green", "Hand Brake Test")}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Essential Checks</Text>
            <View style={styles.cardContent}>
              {renderItem("check-circle", "green", "Headlights")}
              {renderItem("error-outline", "red", "Brake Lights")}
              {renderItem("error", "orange", "Indicators")}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Interior Checks</Text>
            <View style={styles.cardContent}>
              {renderItem("check-circle", "green", "Seat Belts")}
              {renderItem("error", "orange", "Dashboard Warning Lights")}
              {renderItem("error-outline", "red", "Horn Functionality")}
            </View>
          </View>
        </View>
      )}

      {/* Move the button to the bottom */}
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
          {isExpanded ? "Hide Report" : "View Detailed Report"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const renderItem = (iconName, color, label) => (
  <View style={styles.iconRow}>
    <View style={styles.iconContainer}>
      <Icon name={iconName} size={18} color={color} />
    </View>
    <Text style={styles.text}>{label}</Text>
  </View>
);

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
    // marginTop: 0,
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
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#2A5DB0",
    color: "white",
    padding: 5,
    borderRadius: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardContent: {
    paddingLeft: 5,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#2A5DB0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default InspectionReport;
