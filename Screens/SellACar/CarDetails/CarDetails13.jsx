import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const CarDetails13 = () => {
  const navigation = useNavigation(); // Initialize navigation
  const { carState, dispatch } = useCar();

  function onChangeCarMake(value) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "condition",
      value,
    });
  }

  const options = [
    { id: 1, label: "Poor" },
    { id: 2, label: "Fair" },
    { id: 3, label: "Good" },
    { id: 4, label: "Excellent" },
  ];

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 13 of 14</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Condition</Text>
        <View style={styles.line} />
      </View>

      {/* Clickable List */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChangeCarMake(item.label)}>
            <View
              style={[
                styles.optionContainer,
                carState.carDetails.condition === item.label && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.entityText,
                  carState.carDetails.condition === item.label && styles.selectedText,
                ]}
              >
                {item.label}
              </Text>
            </View>
            <View style={styles.separator} />
          </TouchableOpacity>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails14")}
          disabled={!carState.carDetails.condition}
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
  optionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 4,
    borderRadius: 5,
  },
  selectedOption: {
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
  entityText: {
    fontSize: 16,
    color: "#000",
  },
  selectedText: {
    color: "#2F61BF", 
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 15,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: "3%",
  },
  button: {
    marginBottom: 5,
  },
});

export default CarDetails13;
