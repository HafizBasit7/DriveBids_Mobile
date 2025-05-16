import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../../../API_Callings/R1_API/axios-client";

const { height } = Dimensions.get("window");

const CarDetails1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const navigation = useNavigation();
  const bottomSheetAnimation = useRef(new Animated.Value(height)).current;

  const { data, isLoading } = useQuery({
    queryKey: ["make"],
    queryFn: async () => {
      const result = await apiClient.get("/makes");
      return result.data;
    },
    refetchOnMount: false,
  });
  const makes = data?.Makes;

  const { carState, dispatch } = useCar();

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  function onChangeCarMake(value) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "make",
      value,
    });
    setInputValue(value);
    closeBottomSheet();
  }

  const openBottomSheet = () => {
    setSearchText("");
    setBottomSheetVisible(true);
    Animated.timing(bottomSheetAnimation, {
      toValue: height * 0.15,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    Keyboard.dismiss(); // Dismiss keyboard when closing bottom sheet
    Animated.timing(bottomSheetAnimation, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setBottomSheetVisible(false);
    });
  };

  let filteredMakes;
  if (searchText && makes) {
    filteredMakes = makes?.filter((make) =>
      make.make_display.toLowerCase().includes(searchText.toLowerCase())
    );
  } else {
    filteredMakes = makes;
  }

  // Check if the search text doesn't match any make in the list
  const noMatchFound =
    searchText && filteredMakes && filteredMakes.length === 0;

  // Function to handle manual entry selection
  const handleManualEntry = () => {
    onChangeCarMake(searchText);
  };

  const onNext = () => {
    if (carState.carDetails.make) {
      navigation.navigate("CarDetails2");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Step Progress Indicator */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText}>Step 1 of 14</Text>
          <View style={styles.line} />
        </View>

        {/* Section Title */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText2}>Brand</Text>
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
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={openBottomSheet}
            activeOpacity={0.7}
          >
            <TextInput
              style={styles.input}
              placeholder="Car's make"
              placeholderTextColor="#999"
              value={carState.carDetails.make}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton  style={[
    styles.button,
    !carState.carDetails.make && { backgroundColor: "#ccc" },
  ]} title="Next" onPress={onNext}  disabled={!carState.carDetails.make} />
            <View style={{ height: 10 }} />
          </View>
        </View>
        {/* Bottom Sheet Modal */}
        <Modal
          visible={bottomSheetVisible}
          transparent={true}
          animationType="none"
          onRequestClose={closeBottomSheet}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          >
            <TouchableWithoutFeedback onPress={closeBottomSheet}>
              <View
                style={[styles.modalOverlay, { justifyContent: "flex-end" }]}
              >
                <StatusBar
                  barStyle="dark-content"
                  backgroundColor="rgba(0,0,0,0.5)"
                  translucent
                />
                <Animated.View
                  style={[
                    styles.bottomSheet,
                    {
                      transform: [{ translateY: bottomSheetAnimation }],
                      maxHeight: height * 0.65,
                      minHeight: height * 0.6,
                    },
                  ]}
                >
                  <SafeAreaView style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetHeader}>
                      <Text style={styles.bottomSheetTitle}>
                        Select Car Make
                      </Text>
                      <TouchableOpacity onPress={closeBottomSheet}>
                        <Text style={styles.closeButton}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Car's make"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus={true}
                      />
                    </View>

                    {/* Car makes list */}
                    {isLoading ? (
                      <ActivityIndicator
                        size="large"
                        color={GlobalStyles.colors.ButtonColor}
                        style={styles.loader}
                      />
                    ) : (
                      <FlatList
                        data={filteredMakes}
                        
                        keyExtractor={(item) => item.make_id}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              Keyboard.dismiss(); // Dismiss keyboard before selection
                              onChangeCarMake(item.make_display);
                            }}
                            activeOpacity={0.7}
                          >
                            <Text
                              style={[
                                styles.entityText,
                                carState.carDetails.make ===
                                  item.make_display && styles.selectedText,
                              ]}
                            >
                              {item.make_display}
                            </Text>
                            <View style={styles.separator} />
                          </TouchableOpacity>
                        )}
                        style={styles.makesList}
                        contentContainerStyle={styles.listContent}
                        ListFooterComponent={
                          noMatchFound && searchText.trim() !== "" ? (
                            <TouchableOpacity
                              onPress={handleManualEntry}
                              activeOpacity={0.7}
                              style={styles.manualEntryContainer}
                            >
                              <Text style={styles.manualEntryText}>
                                Can't find it? Enter manually
                              </Text>
                              <Text style={styles.manualEntryValue}>
                                "{searchText}"
                              </Text>
                              <View style={styles.separator} />
                            </TouchableOpacity>
                          ) : null
                        }
                      />
                    )}
                  </SafeAreaView>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
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
    fontSize: 18,
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
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: "2%",
  },
  button: {
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.ButtonColor,
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
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  bottomSheetContent: {
    
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
  makesList: {
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  manualEntryContainer: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  manualEntryText: {
    fontSize: 16,
    color: GlobalStyles.colors.ButtonColor || "#007BFF",
    fontWeight: "700",
    paddingHorizontal: 25,
    paddingBottom: 5,
  },
  manualEntryValue: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
});

export default CarDetails1;
