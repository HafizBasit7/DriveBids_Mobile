import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const MIN_VALUE = 20;
const MAX_VALUE = 600;
const definedValues = [20, 150, 280, 420, 600]; // Predefined snapping points

const mapProgressToHorsePower = (progressValue) => {
  return Math.round((progressValue / 100) * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
};

const mapHorsePowerToProgress = (horsePowerValue) => {
  return Math.round(((horsePowerValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100);
};

const snapToNearestValue = (value) => {
  return definedValues.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

const CarDetails11 = () => {
  const navigation = useNavigation();
  const { carState, dispatch } = useCar();

  const initialHorsePower = carState.carDetails.horsePower || MIN_VALUE;
  const [horsePower, setHorsePower] = useState(initialHorsePower);
  const [progress] = useState(new Animated.Value(mapHorsePowerToProgress(initialHorsePower)));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      let newProgress = Math.max(0, Math.min(100, mapHorsePowerToProgress(horsePower) + gestureState.dx / 4));
      let newHorsePower = mapProgressToHorsePower(newProgress);

      setHorsePower(newHorsePower);
      progress.setValue(newProgress);
    },
    onPanResponderRelease: () => {
      progress.stopAnimation((value) => {
        const finalHorsePower = snapToNearestValue(mapProgressToHorsePower(value)); // Snap to nearest value
        setHorsePower(finalHorsePower);
        progress.setValue(mapHorsePowerToProgress(finalHorsePower)); // Update progress to match snapped value
        
        dispatch({
          type: "UPDATE_FIELD",
          section: "carDetails",
          field: "horsePower",
          value: finalHorsePower,
        });
      });
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText}>Step 11 of 14</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText2}>Horse Power</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressHeading}>Horse Power: {horsePower}</Text>
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
            {definedValues.map((value, index) => (
              <Text key={index} style={styles.rangeText}>{value}</Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails12")}
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
    marginRight:8
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
