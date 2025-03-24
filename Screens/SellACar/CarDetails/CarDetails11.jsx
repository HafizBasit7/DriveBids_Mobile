import React, { useState } from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const MIN_VALUE = 20;
const MAX_VALUE = 600;

const mapProgressToMileage = (progressValue) => {
  return Math.round((progressValue / 100) * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
};

const mapMileageToProgress = (mileageValue) => {
  return Math.round(((mileageValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100);
};

const CarDetails11 = () => {
  const navigation = useNavigation();
  const {carState, dispatch} = useCar();
  const [progress] = useState(new Animated.Value(carState.carDetails.horsePower ? mapMileageToProgress(carState.carDetails.horsePower) : 0));
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      progress.stopAnimation((value) => {
        //Update in state
        dispatch({
          type: 'UPDATE_FIELD',
          section: 'carDetails',
          field: 'horsePower',
          value: mapProgressToMileage(value)
        });
      });
    },
    onPanResponderMove: (event, gestureState) => {
      let newValue = Math.max(0, Math.min(100, mapMileageToProgress(carState.carDetails.horsePower) + gestureState.dx / 4));
      progress.setValue(newValue);
    },
    onPanResponderRelease: () => {
      progress.stopAnimation((value) => {
        //Update in state
        dispatch({
          type: 'UPDATE_FIELD',
          section: 'carDetails',
          field: 'horsePower',
          value: mapProgressToMileage(value)
        });
      });
    },
  });

  return (
    <View style={styles.container}>

    {/* Top Content */}
    <View style={{ flex: 1 }}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 11 of 14</Text>
        <View style={styles.line} />
      </View>
  
      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Horse Power</Text>
        <View style={styles.line} />
      </View>
  
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressHeading}>Horse Power: {carState.carDetails.horsePower || 0}</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.filledBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.progressCircle,
              {
                left: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
            {...panResponder.panHandlers}
          />
        </View>
  
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeText}>20</Text>
          <Text style={styles.rangeText}>100</Text>
          <Text style={styles.rangeText}>200</Text>
          <Text style={styles.rangeText}>400</Text>
          <Text style={styles.rangeText}>600</Text>
        </View>
      </View>
    </View>
  
    {/* Button Container */}
    <View style={styles.buttonContainer}>
      <CustomButton
        style={styles.button}
        title="Next"
        onPress={() => navigation.navigate("CarDetails12")}
      />
      <View style={{ height: 10 }} />
      <CustomButton
        title="Back"
        style={styles.backButton}
        textStyle={{ color: "#007BFF" }}
        onPress={() => navigation.goBack()}
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
  progressContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  progressHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ccc",
    borderRadius: 4,
    position: "relative",
  },
  filledBar: {
    height: 8,
    backgroundColor: "#007BFF",
    borderRadius: 4,
    position: "absolute",
    left: 0,
  },
  progressCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#007BFF",
    position: "absolute",
    top: -6,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  rangeText: {
    fontSize: 14,
    color: "#000",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginBottom: "3%",
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

export default CarDetails11;
