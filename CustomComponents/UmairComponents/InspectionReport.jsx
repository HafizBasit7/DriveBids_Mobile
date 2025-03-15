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
              {renderGrid([
                { icon: "check-circle", color: "green", label: "Ok" },
                { icon: "block", color: "gray", label: "Not Tested" },
                {
                  icon: "error",
                  color: "orange",
                  label: "Requires Some Attention",
                },
                {
                  icon: "error-outline",
                  color: "red",
                  label: "Requires Immediate Attention",
                },
                { icon: "check-circle", color: "green", label: "Passed" },
                { icon: "error", color: "orange", label: "Minor Issue" },
                { icon: "error-outline", color: "red", label: "Major Issue" },
                { icon: "block", color: "gray", label: "Not Applicable" },
              ])}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Dynamic Operations</Text>
            <View style={styles.cardContent}>
              {renderGrid([
                {
                  icon: "check-circle",
                  color: "green",
                  label: "Brake Efficiency Test",
                },
                {
                  icon: "error",
                  color: "orange",
                  label: "Static Gear Selection",
                },
                {
                  icon: "error-outline",
                  color: "red",
                  label: "Reverse Clutch Slip Test",
                },
                {
                  icon: "check-circle",
                  color: "green",
                  label: "Hand Brake Test",
                },
                {
                  icon: "error",
                  color: "orange",
                  label: "Suspension Performance",
                },
                {
                  icon: "error-outline",
                  color: "red",
                  label: "Engine Idle Stability",
                },
              ])}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Essential Checks</Text>
            <View style={styles.cardContent}>
              {renderGrid([
                { icon: "check-circle", color: "green", label: "Headlights" },
                { icon: "error-outline", color: "red", label: "Brake Lights" },
                { icon: "error", color: "orange", label: "Indicators" },
                { icon: "block", color: "gray", label: "Fog Lights" },
                {
                  icon: "check-circle",
                  color: "green",
                  label: "Reverse Lights",
                },
                { icon: "error-outline", color: "red", label: "Hazard Lights" },
              ])}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Interior Checks</Text>
            <View style={styles.cardContent}>
              {renderGrid([
                { icon: "check-circle", color: "green", label: "Seat Belts" },
                {
                  icon: "error",
                  color: "orange",
                  label: "Dashboard Warning Lights",
                },
                {
                  icon: "error-outline",
                  color: "red",
                  label: "Horn Functionality",
                },
                {
                  icon: "check-circle",
                  color: "green",
                  label: "AC/Heater Functionality",
                },
                {
                  icon: "block",
                  color: "gray",
                  label: "Radio/Multimedia System",
                },
              ])}
            </View>
          </View>
        </View>
      )}

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

const renderGrid = (items) => {
  const numColumns = items.length <= 4 ? 1 : 2;
  return (
    <View
      style={[
        styles.gridContainer,
        { flexDirection: numColumns === 1 ? "column" : "row" },
      ]}
    >
      {items.map((item, index) => (
        <View key={index} style={styles.gridItem}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={12} color={item.color} />
          </View>
          <Text style={styles.text}>{item.label}</Text>
        </View>
      ))}
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
    fontSize: 22,
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
  gridContainer: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2A5DB0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 8,
    fontSize: 10,
  },
});

export default InspectionReport;
