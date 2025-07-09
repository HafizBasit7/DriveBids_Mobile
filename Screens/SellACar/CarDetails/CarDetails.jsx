import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, FlatList } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const CarDetails3 = () => {
  const years = Array.from(
    { length: new Date().getFullYear() + 4 - 1980 + 1 },
    (_, i) => 1980 + i
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const { carState, dispatch } = useCar();

  useEffect(() => {
    const index = years.indexOf(carState.carDetails.model);
    if (index !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: index * 50,
          animated: false,
        });
      }, 100);
    }
  }, []);

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
      outputRange: [16, 18, 20],
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

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 50);

    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "model",
      value: parseInt(years[index]),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 3 of 10</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Model Year</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.yearSelectorContainer}>
        <FlatList
          ref={flatListRef}
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
            { useNativeDriver: false, listener: handleScroll }
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails4")}
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
    marginTop: 40,
    height: 265,
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
  selectedYearText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: "1%",
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
