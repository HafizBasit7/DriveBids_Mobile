import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CarFeatures = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header Line */}
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Car Features</Text>
        <View style={styles.fullLine} />
      </View>
{/* //TODO : CAR FEATURES */}
      {/* Expandable Content */}
      {isExpanded && (
        <View style={styles.featuresContainer}>
          {/* Available Features */}
          <View style={styles.column}>
            {availableFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon name="check-circle" size={16} color="#2A5DB0" />
                {feature.family === "FontAwesome5" ? (
                  <FontAwesome5
                    name={feature.icon}
                    size={15}
                    style={styles.featureIcon}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={feature.icon}
                    size={15}
                    style={styles.featureIcon}
                  />
                )}
                <Text style={styles.featureText}>{feature.name}</Text>
              </View>
            ))}
          </View>

          {/* Unavailable Features */}
          <View style={styles.column}>
            {unavailableFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon name="cancel" size={16} color="gray" />
                {feature.family === "FontAwesome5" ? (
                  <FontAwesome5
                    name={feature.icon}
                    size={15}
                    style={styles.featureIcon}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={feature.icon}
                    size={15}
                    style={styles.featureIcon}
                  />
                )}
                <Text style={[styles.featureText, styles.disabledText]}>
                  {feature.name}
                </Text>
              </View>
            ))}
          </View>
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
          {isExpanded ? "Hide Car Features" : "View Car Features"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

/* Features Data with Icons */
const availableFeatures = [
  { name: "ABS", icon: "car", family: "FontAwesome5" },
  { name: "Air Conditioning", icon: "snowflake", family: "FontAwesome5" },
  { name: "Immobilizer Key", icon: "key", family: "FontAwesome5" },
  { name: "Air Bags", icon: "user-shield", family: "FontAwesome5" },
  { name: "Navigation System", icon: "location-arrow", family: "FontAwesome5" },
  {
    name: "Power Steering",
    icon: "steering",
    family: "MaterialCommunityIcons",
  }, // Fixed
];

const unavailableFeatures = [
  { name: "Power Locks", icon: "lock", family: "FontAwesome5" },
  { name: "Power Windows", icon: "car-side", family: "FontAwesome5" },
  { name: "AM/FM Radio", icon: "radio", family: "MaterialCommunityIcons" }, // Fixed
];

/* Styles */
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
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // marginHorizontal: 16,
  },
  column: {
    flex: 1,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  featureIcon: {
    marginLeft: 8,
    color: "black",
  },
  featureText: {
    fontSize: 12,
    marginLeft: 10,
  },
  disabledText: {
    color: "gray",
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
});

export default CarFeatures;
