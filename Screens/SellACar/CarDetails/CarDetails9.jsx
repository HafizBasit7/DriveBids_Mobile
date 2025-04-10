import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const CarDetails9 = () => {
  const navigation = useNavigation();
  const { carState, dispatch } = useCar();

  const options = [
    { id: 1, label: "Manual" },
    { id: 3, label: "CVT" },
    { id: 4, label: "DCT" },
    { id: 5, label: "AGS" },
    { id: 6, label: "AMT" },
    { id: 10, label: "EV Single-Speed" },
  ];

  const toggleSelection = (value) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "transmission",
      value,
    });
  };

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 9 of 14</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Transmission</Text>
        <View style={styles.line} />
      </View>

      {/* Clickable List */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelection(item.label)}>
            <View style={styles.rowContainer}>
              <Text
                style={[
                  styles.entityText,
                  carState.carDetails.transmission === item.label && styles.selectedText,
                ]}
              >
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails10")}
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
  rowContainer: {
    marginTop:5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    
  },
  entityText: {
    fontSize: 16,
    color: "#000",
  },
  selectedText: {
    color: "#007BFF",
    fontWeight: "bold",
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
});

export default CarDetails9;
