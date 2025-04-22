import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  SafeAreaView,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const { height } = Dimensions.get("window");

const CarDetails3 = () => {
  const [inputValue, setInputValue] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const bottomSheetAnimation = useRef(new Animated.Value(height)).current;
  const { carState, dispatch } = useCar();

  // Generate years from 1985 to current year
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const yearsArray = [];
    for (let year = 1985; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    return yearsArray.reverse();
  }, [currentYear]);

  React.useEffect(() => {
    if (carState.carDetails.model) {
      setInputValue(carState.carDetails.model.toString());
    }
  }, [carState.carDetails.model]);

  const updateValue = (value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field: 'model',
      value: parseInt(value),
    });
    setInputValue(value);
    closeBottomSheet();
  };

  const openBottomSheet = () => {
    setSearchText(""); // Reset search text when opening
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

  // Filter years based on search text
  const filteredYears = useMemo(() => {
    if (!searchText) return years;
    return years.filter(year =>
      year.toString().includes(searchText)
    );
  }, [searchText, years]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText}>Step 3 of 14</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText2}>Model Year</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressHeading}>Model</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={openBottomSheet}
              activeOpacity={0.7}
            >
              <TextInput
                style={styles.input}
                placeholder="Select model year"
                placeholderTextColor="#999"
                value={inputValue}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="Next"
            onPress={() => navigation.navigate("CarDetails4")}
          />
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
                    {
                      transform: [{ translateY: bottomSheetAnimation }],
                    },
                  ]}
                >
                  <SafeAreaView style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetHeader}>
                      <Text style={styles.bottomSheetTitle}>Select Model Year</Text>
                      <TouchableOpacity onPress={closeBottomSheet}>
                        <Text style={styles.closeButton}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Search input in bottom sheet */}


                    {/* Years list */}
                    <FlatList
                      data={filteredYears}
                      keyExtractor={(item) => item.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => updateValue(item.toString())}>
                          <Text
                            style={[
                              styles.entityText,
                              carState.carDetails.model === item && styles.selectedText,
                            ]}
                          >
                            {item}
                          </Text>
                          <View style={styles.separator} />
                        </TouchableOpacity>
                      )}
                      style={styles.yearsList}
                      initialNumToRender={20}
                      maxToRenderPerBatch={20}
                      windowSize={10}
                    />
                  </SafeAreaView>
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
    height: 55,
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
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginBottom: "9%",
  },
  button: {
    marginBottom: 5,
  },
  // Bottom Sheet Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.65, // Takes up 70% of screen height
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
  yearsList: {
    flexGrow: 1,
  },
  entityText: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  selectedText: {
    color: "#007BFF",
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 22,
  },
});

export default CarDetails3;