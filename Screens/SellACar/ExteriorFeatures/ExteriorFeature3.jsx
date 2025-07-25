import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

const ExteriorFeature3 = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation();

  const options = [
    { id: 1, label: "Airbags" },
    { id: 2, label: "Traction Control" },
    { id: 3, label: "Reverse Camera" },
    { id: 4, label: "Anti-lock Braking System (ABS)" },
    { id: 5, label: "Electronic Stability Control" },
    { id: 6, label: "Lane Departure Warning" },
    { id: 7, label: "Blind Spot Monitoring" },
    { id: 8, label: "Adaptive Cruise Control" },
    { id: 9, label: "Parking Sensors" },
    { id: 10, label: "Tyre Pressure Monitoring System" },
  ];

  const toggleSelection = (id) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 3 of 3</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Exterior Features</Text>
        <View style={styles.line} />
      </View>

      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelection(item.id)}>
            <View style={styles.optionContainer}>
              <CheckBox
                checked={selectedOptions.includes(item.id)}
                onPress={() => toggleSelection(item.id)}
                checkedColor="#007BFF"
              />
              <Text style={styles.entityText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Finish"
          onPress={() => navigation.navigate("VehicleInfo")}
        />
        <View style={{ height: 10 }} />
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    height: 55,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  entityText: {
    fontSize: 16,
    color: "#000",
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

export default ExteriorFeature3;
