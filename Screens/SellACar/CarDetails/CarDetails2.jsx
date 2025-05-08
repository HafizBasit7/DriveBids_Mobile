import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TouchableWithoutFeedback } from "react-native";
import apiClient from "../../../API_Callings/R1_API/axios-client";

const { height } = Dimensions.get("window");

const CarDetails2 = () => {
  const [inputValue, setInputValue] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const navigation = useNavigation();
  const bottomSheetAnimation = useRef(new Animated.Value(height)).current;

  const { carState, dispatch } = useCar();
  const make = carState.carDetails.make;

  const {data, isLoading} = useQuery({
    queryKey: ['variant', make.toLowerCase()],
    queryFn: async () => {
      const result = await apiClient.get(`/models?make=${make?.toLowerCase()}`);
      return result.data;
    },
    refetchOnMount: false,
  });
  const variants = data?.Models;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  function onChangeCarVariant(value) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "carDetails",
      field: "variant",
      value,
    });
    setInputValue(value);
    closeBottomSheet();
  }

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

  let filteredVariants;
  if (searchText && variants) {
    filteredVariants = variants.filter((variant) =>
      variant.model_name.toLowerCase().includes(searchText.toLowerCase())
    );
  } else {
    filteredVariants = variants;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: height * 0.65 }}>

          {/* Input Field (acting as a button to open bottom sheet) */}
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={openBottomSheet}
            activeOpacity={0.7}
          >
            <TextInput
              style={styles.input}
              placeholder="Search car variant"
              placeholderTextColor="#999"
              value={inputValue}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {/* Next Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.button}
              title="Next"
              onPress={() => navigation.navigate("CarDetails3")}
            />
            <View style={{ height: 10 }} />
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
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
              >
                <TouchableWithoutFeedback>
                  <Animated.View
                     style={[
                      styles.bottomSheet,
                      {
                        transform: [{ translateY: bottomSheetAnimation }],
                        maxHeight: Platform.OS === 'ios' 
                          ? height * 8
                          : height * 0.6,
                        minHeight: Platform.OS === 'ios' 
                          ? height * 8
                          : height * 0.5,
                      },
                    ]}
                  >
                    <SafeAreaView style={styles.bottomSheetContent}>
                      <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>Select Car Variant</Text>
                        <TouchableOpacity onPress={closeBottomSheet}>
                          <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Search input in bottom sheet */}
                      <View style={styles.searchContainer}>
                        <TextInput
                          style={styles.searchInput}
                          placeholder="Search car variant"
                          placeholderTextColor="#999"
                          value={searchText}
                          onChangeText={setSearchText}
                          autoFocus={false}
                        />
                      </View>

                      {/* Car variants list */}
                      {isLoading ? (
                        <ActivityIndicator
                          size="large"
                          color="#007BFF"
                          style={styles.loader}
                        />
                      ) : (
                        <FlatList
                          data={filteredVariants}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => onChangeCarVariant(item.model_name)}
                            >
                              <Text
                                style={[
                                  styles.entityText,
                                  carState.carDetails.variant === item.model_name &&
                                  styles.selectedText,
                                ]}
                              >
                                {item.model_name}
                              </Text>
                              <View style={styles.separator} />
                            </TouchableOpacity>
                          )}
                          style={styles.variantsList}
                        />
                      )}
                    </SafeAreaView>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
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
    borderColor: "#007BFF",
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
  variantsList: {
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CarDetails2;