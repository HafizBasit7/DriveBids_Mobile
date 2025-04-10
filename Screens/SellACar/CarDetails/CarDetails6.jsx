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

const CarDetails6 = () => {
  const navigation = useNavigation();
  const { carState, dispatch } = useCar();

  const options = [
    { id: 1, label: "Petrol" },
    { id: 2, label: "Diesel" },
    { id: 3, label: "HI-Octane" },
    { id: 4, label: "Electricity" },
    { id: 5, label: "Hybrid" },
  ];

  const toggleSelection = (value) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "fuel",
      value,
    });
  };

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 6 of 14</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Fuel</Text>
        <View style={styles.line} />
      </View>

      {/* Clickable List */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelection(item.label)}>
            <View style={styles.row}>
              <Text
                style={[
                  styles.tableData,
                  carState.carDetails.fuel === item.label && styles.selectedText,
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
          onPress={() => navigation.navigate("CarDetails7")}
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
  row: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
  },
  tableData: {
    fontSize: 16,
    color: "#000", // Default color
  },
  selectedText: {
    color: "#2F61BF", // Blue color for selected item
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    marginBottom: "3%",
  },
  button: {
    marginBottom: 5,
  },
});

export default CarDetails6;
