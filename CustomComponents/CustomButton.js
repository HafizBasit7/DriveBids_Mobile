import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../Styles/GlobalStyles";

const { height } = Dimensions.get("window");

const CustomButton = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#ccc" : GlobalStyles.colors.ButtonColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: height * 0.07,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.02,
    
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
  },
});

export default CustomButton;
