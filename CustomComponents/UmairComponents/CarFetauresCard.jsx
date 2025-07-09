import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CarFeatures = ({features}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updatedFeatures = Object.values(features).flat();

  return (
    <View style={styles.container}>
      {/* Header Line */}
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Car Features</Text>
        <View style={styles.fullLine} />
      </View>

      {/* Expandable Content */}
      {isExpanded && (
        <View style={styles.featuresContainer}>
          {/* Available Features in Two Columns */}
          <View style={styles.column}>
            {updatedFeatures.slice(0, Math.ceil(updatedFeatures.length / 2)).map((feature, index) => {
              return (
                <View key={index} style={styles.featureItem}>
                  <Icon name="check-circle" size={16} color="#2A5DB0" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.column}>
            {updatedFeatures.slice(Math.ceil(updatedFeatures.length / 2)).map((feature, index) => {
              return (
                <View key={index} style={styles.featureItem}>
                  <Icon name="check-circle" size={16} color="#2A5DB0" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              );
            })}
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
  },
  column: {
    flex: 1,
    marginRight: 15, // Space between columns
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  featureText: {
    fontSize: 12,
    marginLeft: 10,
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
