import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, FlatList } from "react-native";
import CustomButton from "../../CustomComponents/CustomButton";

const CarDetails3 = () => {
  const years = Array.from({ length: 50 }, (_, i) => 2000 + i);
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [(index - 1) * 50, index * 50, (index + 1) * 50];
    const textColor = scrollY.interpolate({
      inputRange,
      outputRange: ["#808080", "#007BFF", "#808080"],
      extrapolate: "clamp",
    });
    const textSize = scrollY.interpolate({
      inputRange,
      outputRange: [18, 26, 18],
      extrapolate: "clamp",
    });
    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [20, 18, 20],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.yearContainer, { transform: [{ translateY }] }]}
      >
        <Animated.Text
          style={[styles.yearText, { color: textColor, fontSize: textSize }]}
        >
          {item}
        </Animated.Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 3 of 10</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Model</Text>
        <View style={styles.line} />
      </View>

      {/* Year Selector */}
      <View style={styles.yearSelectorContainer}>
        <FlatList
          data={years}
          keyExtractor={(item) => item.toString()}
          renderItem={renderItem}
          snapToAlignment="center"
          snapToInterval={50}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.button} title="Next" />
        <View style={{ height: 10 }} />
        <CustomButton
          title="Back"
          style={styles.backButton}
          textStyle={{ color: "#007BFF" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },
  lineText: {
    marginHorizontal: 4,
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  lineText2: {
    marginHorizontal: 4,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  yearSelectorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 150,
    overflow: "hidden",
  },
  yearContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  yearText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },
  button: {
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007BFF",
  },
});

export default CarDetails3;
