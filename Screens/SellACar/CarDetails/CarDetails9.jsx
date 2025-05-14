import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const { height } = Dimensions.get("window");

const CarDetails9 = () => {
  const navigation = useNavigation();
  const { carState, dispatch } = useCar();

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(height)).current;

  const options = [
    { id: 1, label: "Manual" },
    { id: 3, label: "CVT - Continuously Variable Transmission" },
    { id: 4, label: "DCT - Dual Clutch Transmission" },
    { id: 5, label: "AGS - Auto Gear Shift (semi-automatic)" },
    { id: 6, label: "AMT - Automated Manual Transmission " },
    { id: 10, label: "EV Single-Speed – Used in most electric vehicles " },
  ];

  const toggleSelection = (value) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "transmission",
      value,
    });
    closeBottomSheet(); // Close the bottom sheet after selection
  };

  const openBottomSheet = () => {
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
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: height * 0.65,
        }}
      >
        {/* Button to open the bottom sheet */}
        <TouchableOpacity onPress={openBottomSheet}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>
              {carState.carDetails.transmission || "Select Transmission"}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="Next"
            onPress={() => navigation.navigate("CarDetails10")}
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
              backgroundColor="rgba(0,0,0,0.5)"
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
                    <Text style={styles.bottomSheetTitle}>
                      Select Transmission
                    </Text>
                    <TouchableOpacity onPress={closeBottomSheet}>
                      <Text style={styles.closeButton}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Transmission options list */}
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => toggleSelection(item.label)}
                      >
                        <View style={styles.row}>
                          <Text
                            style={[
                              styles.tableData,
                              carState.carDetails.transmission === item.label &&
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

      {/* Buttons */}
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
  inputText: {
    fontSize: 16,
    color: "#000",
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableData: {
    fontSize: 16,
    color: "#000",
  },
  selectedText: {
    color: "#007BFF", // Blue color for selected item
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
});

export default CarDetails9;
