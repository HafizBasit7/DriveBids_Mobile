import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../Styles/GlobalStyles";

const VehicleInfoCard = ({
  name,
  steps,
  iconName,
  completionStatus,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              completionStatus === "Completed"
                ? GlobalStyles.colors.ButtonColor
                : "#F0F0F0",
          },
        ]}
      >
        <Icon
          name={iconName}
          size={24}
          color={completionStatus === "Completed" ? "white" : "#6F6F6F"}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.name,
            completionStatus === "Completed"
              ? { color: "black" }
              : { color: "#6F6F6F" },
          ]}
        >
          {name}
        </Text>

        <Text style={{ fontSize: 13, fontFamily: "Inter-Regular" }}>
          <Icon
            name={
              completionStatus === "Completed" ? "check-circle" : "close-circle"
            }
            style={[
              completionStatus === "Completed"
                ? { color: GlobalStyles.colors.ButtonColor, fontSize: 13 }
                : { color: "#6F6F6F", fontSize: 13 },
            ]}
          />
          {" " + completionStatus}
        </Text>
      </View>
      <Text
        style={{ fontFamily: "Inter-SemiBold", fontSize: 13, color: "#6F6F6F" }}
      >
        {steps} Steps
      </Text>
      <Icon name="chevron-right" size={24} color="#6F6F6F" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderColor: "#D8DADC",
    borderWidth: 1,

    borderRadius: 8,

    width: "100%",
    marginBlock: 3,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  completionStatus: {
    fontSize: 14,
  },
  Completedd: {
    color: "#007AFF",
  },
});

export default memo(VehicleInfoCard);
