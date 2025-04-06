import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CarDetails2 = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation(); 

  const {carState, dispatch} = useCar();
  const make = carState.carDetails.make;

  const {data, isLoading} = useQuery({
    queryKey: ['variant', make.toLowerCase()],
    queryFn: async () => {
      const result = await axios.get(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make.toLowerCase()}`);
      return result.data;
    }
  });

  const variants = data?.Models;

  function onChangeCarVariant (value) {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field: 'variant',
      value,
    });
  };

  // const options = [
  //   { id: 1, label: "Corolla" },
  //   { id: 2, label: "Civic" },
  //   { id: 3, label: "Mustang" },
  //   { id: 4, label: "X5" },
  //   { id: 5, label: "C-Class" },
  //   { id: 6, label: "Altima" },
  //   { id: 7, label: "Elantra" },
  //   { id: 8, label: "Camaro" },
  //   { id: 9, label: "Sportage" },
  //   { id: 10, label: "Golf" },
  // ];

  let filteredVariants;
  if(inputValue && variants) {
    filteredVariants = variants.filter(variant => variant.model_name.toLowerCase().includes(inputValue.toLowerCase()));
  } else {
    filteredVariants = variants;
  }

  return (
    <View style={styles.container}>
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 2 of 14</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Variant</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search car variant"
          placeholderTextColor="#999"
          value={inputValue}
          onChangeText={setInputValue}
        />
      </View>

      {isLoading && <ActivityIndicator/>}
      {!isLoading && (
        <FlatList
        data={filteredVariants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChangeCarVariant(item.model_name)}>
            <Text
              style={[
                styles.entityText,
                carState.carDetails.variant === item.model_name && styles.selectedText,
              ]}
            >
              {item.model_name}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        )}
      />
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Next"
          onPress={() => navigation.navigate("CarDetails3")}
        />
        <View style={{ height: 10 }} />
        {/* <CustomButton
          title="Back"
          style={styles.backButton}
          textStyle={{ color: "#007BFF" }}
          onPress={() => navigation.goBack()}
        /> */}
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
  entityText: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  selectedText: {
    color: "#007BFF", // Blue color for selected text
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 22,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: "2%"
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

export default CarDetails2;
