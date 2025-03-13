import React, { useState } from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
const CarDetails5 = () => {
  
  const [progress] = useState(new Animated.Value(0));
  const [lastProgress, setLastProgress] = useState(0); // Store last valid progress
  const navigation = useNavigation(); // Initialize navigation
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // Store last progress when dragging starts
      progress.stopAnimation((value) => {
        setLastProgress(value);
      });
    },
    onPanResponderMove: (event, gestureState) => {
      let newValue = Math.max(
        0,
        Math.min(100, lastProgress + gestureState.dx / 4)
      ); // Add dx to last progress
      progress.setValue(newValue); // Update progress
    },
    onPanResponderRelease: () => {
      progress.stopAnimation((value) => {
        setLastProgress(value); // Save the last position
      });
    },
  });

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 5 of 10</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Milage</Text>
        <View style={styles.line} />
      </View>

      {/* Progress Bar Container */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressHeading}>Mileage</Text>
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
          <Text style={styles.rangeText}>10k</Text>
          <Text style={styles.rangeText}>20k</Text>
          <Text style={styles.rangeText}>40k</Text>
          <Text style={styles.rangeText}>80k</Text>
          <Text style={styles.rangeText}>160k</Text>
          <Text style={styles.rangeText}>320k</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails6")}
        />
        <View style={{ height: 10 }} />
        <CustomButton
          title="Back"
          style={styles.backButton}
          textStyle={{ color: "#007BFF" }}
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
  progressContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  progressHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    marginTop: 20,
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
    marginTop: "60%",
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

export default CarDetails5;
