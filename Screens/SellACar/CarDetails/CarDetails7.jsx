import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const { height } = Dimensions.get("window");

const CarDetails7 = () => {
  const [inputValue, setInputValue] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(height)).current;

  const { carState, dispatch } = useCar();
  const navigation = useNavigation();

  const options = [
    { id: 1, label: "Red" },
    { id: 2, label: "Blue" },
    { id: 3, label: "Green" },
    { id: 4, label: "Yellow" },
    { id: 5, label: "Black" },
    { id: 6, label: "White" },
    { id: 7, label: "Purple" },
    { id: 8, label: "Orange" },
    { id: 9, label: "Pink" },
    { id: 10, label: "Gray" },
  ];

  const toggleColor = (value) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "color",
      value,
    });
    setInputValue(value);
    closeBottomSheet();
  };

  const openBottomSheet = () => {
    setInputValue(""); // Reset input value when opening the bottom sheet
    setBottomSheetVisible(true);
    Animated.timing(bottomSheetAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(bottomSheetAnimation, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setBottomSheetVisible(false);
    });
  };

  let filteredOptions = options;
  if (inputValue) {
    filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Step Progress Indicator */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText}>Step 7 of 14</Text>
          <View style={styles.line} />
        </View>

        {/* Section Title */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText2}>Colour</Text>
          <View style={styles.line} />
        </View>

        {/* Input Field to open bottom sheet */}
        
                        <View style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:height*0.65}}>
        
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={openBottomSheet}
        >
          <TextInput
            style={styles.input}
            placeholder="Select color"
            placeholderTextColor="#999"
            value={inputValue}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
          {/* Button to Navigate */}
          <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="Next"
            onPress={() => navigation.navigate("CarDetails8")}
          />
        </View>
        </View>

        {/* Bottom Sheet Modal */}
        <Modal
          visible={bottomSheetVisible}
          transparent={true}
          animationType="none"
        >
          <TouchableWithoutFeedback onPress={closeBottomSheet}>
            <View style={styles.modalOverlay}>
               <StatusBar
                                    barStyle="dark-content"
                                    backgroundColor= "rgba(0,0,0,0.3)" 
                                    translucent
                                  />
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.bottomSheet,
                    { transform: [{ translateY: bottomSheetAnimation }] },
                  ]}
                >
                  <View style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetHeader}>
                      <Text style={styles.bottomSheetTitle}>Select Color</Text>
                      <TouchableOpacity onPress={closeBottomSheet}>
                        <Text style={styles.closeButton}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search colors"
                        placeholderTextColor="#999"
                        value={inputValue}
                        onChangeText={setInputValue}
                      />
                    </View>

                    {/* Fuel options list */}
                    <FlatList
                      data={filteredOptions}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => toggleColor(item.label)}>
                          <View style={styles.row}>
                            <Text
                              style={[
                                styles.tableData,
                                carState.carDetails.color === item.label &&
                                  styles.selectedText,
                              ]}
                            >
                              {item.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      
      </View>
    </TouchableWithoutFeedback>
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
  row: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableData: {
    fontSize: 16,
    color: "#000",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.6, // Takes up 60% of screen height
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeButton: {
    fontSize: 22,
    fontWeight: "500",
    color: "#888",
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
});

export default CarDetails7;
