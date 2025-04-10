import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard,} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { TextInput } from "react-native-gesture-handler";

const CarDetails8 = () => {
  const navigation = useNavigation();
  const { carState, dispatch } = useCar();

  const updateValue = (value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field: 'engineSize',
      value: parseInt(value),
    });
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText}>Step 8 of 14</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText2}>Engine Size</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressHeading}>Engine Size (CC)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Engine Size"
                placeholderTextColor="#999"
                value={(carState.carDetails.engineSize || 0).toString()}
                onChangeText={updateValue}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="Next"
            onPress={() => navigation.navigate("CarDetails9")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
},
input: {
  flex: 1,
  fontSize: 16,
  color: "#000",
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
inputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
  paddingHorizontal: 15,
  // marginHorizontal: 20,
  height: 55,
  // marginTop: 10,
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
  marginBottom: 20,
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
  marginBottom:"9%",
 
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

export default CarDetails8;