import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Line } from "react-native-svg";

const SectionHeader = ({ title, sx, marginCustom = 10 }) => {
  return (
    <View style={[styles.container, { marginVertical: marginCustom }]}>
      <Svg height="1" width="100%" style={styles.line}>
        <Line x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="4" />
      </Svg>
      <Text style={sx ? sx : styles.title}>{title}</Text>
      <Svg height="1" width="100%" style={styles.line}>
        <Line x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="4" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    zIndex: 100,
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter-Regular",
    fontWeight: "700",

    marginHorizontal: 10,
  },
  line: {
    flex: 1,
  },
});

export default SectionHeader;
