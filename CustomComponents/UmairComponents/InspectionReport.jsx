import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getCarInspectionReport } from "../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";

const inspectionReportEnum = [
  { icon: "check-circle", color: "green", label: "OK" },
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
];

//Dynamic operations
const dynamicOperations = [
  { name: "Brake Efficiency", target: "breakEfficiency" },
  { name: "Hand Brake Test", target: "handBrakeTest" },
  { name: "Static Gear Selection", target: "staticGearSelection" },
  { name: "Reverse Clutch Slip", target: "reverseClutchSlip" },
  { name: "Steering Noise", target: "steeringNoise" },
  { name: "Suspension Ride Height", target: "suspensionRideHeight" },
  { name: "Air Conditioning Power", target: "airconPower" },
  { name: "Sat Nav Power", target: "satNavPower" },
  { name: "Ice Power", target: "icePower" },
  { name: "Central Locking", target: "centralLocking" },
  {
    name: "Converitble Sunroof Electics",
    target: "convertibleSunroofElectrics",
  },
  { name: "Horn", target: "horn" },
];

const essentialsChecks = [
  { name: "Head lights", target: "headLight" },
  { name: "Brake lights", target: "brakeLight" },
  { name: "Side Lights", target: "sideLight" },
  { name: "Fog lights", target: "fogLight" },
  { name: "Indicators", target: "indicators" },
  { name: "Electric Windows", target: "electricWindows" },
  { name: "Electric Mirrors", target: "electricMirrors" },
  { name: "Wipers", target: "wipers" },
];

const interiorChecks = [
  { name: "Engine Management Light", target: "engineManagementLight" },
  { name: "Brake Wear Indicator Light", target: "breakWearIndicatorLight" },
  { name: "Abs Warning Light", target: "absWarningLight" },
  { name: "Oil Warning Light", target: "oilWarningLight" },
  { name: "Airbag warning light", target: "airbagWarningLight" },
  { name: "Glow plug light", target: "glowPlugLight" },
];

const InspectionReport = ({ car }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["inspectionReport", car],
    queryFn: () => getCarInspectionReport(car),
    enabled: isExpanded,
    refetchOnMount: false,
  });

  const inspectionReport = data?.data?.inspectionReport;

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Inspection Report</Text>
        <View style={styles.fullLine} />
      </View>

      {isExpanded && isLoading && <ActivityIndicator style={{ margin: 30 }} />}

      {isExpanded && !isLoading && (
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
              ])}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Dynamic Operations</Text>
            <View style={styles.cardContent}>
              {inspectionReport?.dynamicOperations &&
                renderGrid(
                  Object.keys(inspectionReport.dynamicOperations).map((key) => {
                    const test = inspectionReportEnum.find(
                      (value) =>
                        value.label === inspectionReport.dynamicOperations[key]
                    );
                    const label = dynamicOperations.find(
                      (val) => val.target === key
                    );

                    return {
                      icon: test.icon,
                      color: test.color,
                      label: label.name,
                    };
                  })
                )}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Essential Checks</Text>
            <View style={styles.cardContent}>
              {inspectionReport?.essentialChecks &&
                renderGrid(
                  Object.keys(inspectionReport.essentialChecks).map((key) => {
                    const test = inspectionReportEnum.find(
                      (value) =>
                        value.label === inspectionReport.essentialChecks[key]
                    );
                    const label = essentialsChecks.find(
                      (val) => val.target === key
                    );

                    return {
                      icon: test.icon,
                      color: test.color,
                      label: label.name,
                    };
                  })
                )}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Interior Checks</Text>
            <View style={styles.cardContent}>
              {inspectionReport?.interiorChecks &&
                renderGrid(
                  Object.keys(inspectionReport.interiorChecks).map((key) => {
                    const test = inspectionReportEnum.find(
                      (value) =>
                        value.label === inspectionReport.interiorChecks[key]
                    );
                    const label = interiorChecks.find(
                      (val) => val.target === key
                    );

                    return {
                      icon: test.icon,
                      color: test.color,
                      label: label.name,
                    };
                  })
                )}
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
