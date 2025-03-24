import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const MIN_VALUE = 8;
const MAX_VALUE = 30;

const mapProgressToMileage = (progressValue) => {
  return Math.round((progressValue / 100) * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
};

const mapMileageToProgress = (mileageValue) => {
  return Math.round(((mileageValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100);
};

const CarDetails5 = () => {
  
  const navigation = useNavigation();
  const {carState, dispatch} = useCar();
  const [progress] = useState(new Animated.Value(carState.carDetails.mileage ? mapMileageToProgress(carState.carDetails.mileage) : 0));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      progress.stopAnimation((value) => {
        //Update in state
        dispatch({
          type: 'UPDATE_FIELD',
          section: 'carDetails',
          field: 'mileage',
          value: mapProgressToMileage(value)
        });
      });
    },
    onPanResponderMove: (event, gestureState) => {
      let newValue = Math.max(0, Math.min(100, mapMileageToProgress(carState.carDetails.mileage) + gestureState.dx / 4));
      progress.setValue(newValue);
    },
    onPanResponderRelease: () => {
      progress.stopAnimation((value) => {
        //Update in state
        dispatch({
          type: 'UPDATE_FIELD',
          section: 'carDetails',
          field: 'mileage',
          value: mapProgressToMileage(value)
        });
      });
    },
  });

  return (
    <View style={styles.container}>
       <View style={styles.content}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 5 of 14</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Mileage</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressHeading}>
          Mileage: {carState.carDetails.mileage || 0} km
        </Text>
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
          <Text style={styles.rangeText}>8</Text>
          <Text style={styles.rangeText}>12</Text>
          <Text style={styles.rangeText}>15</Text>
          <Text style={styles.rangeText}>18</Text>
          <Text style={styles.rangeText}>23</Text>
          <Text style={styles.rangeText}>30</Text>
        </View>
      </View>
    </View>

    {/* Bottom Buttons */}
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
},
content: {
  flex: 1,
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
  paddingHorizontal: 22,
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
  marginBottom:"7%",
 
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