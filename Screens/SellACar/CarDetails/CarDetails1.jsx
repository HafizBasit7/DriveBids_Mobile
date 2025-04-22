import React, { useState, useRef } from "react";
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
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const { height } = Dimensions.get("window");

const CarDetails1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const bottomSheetAnimation = useRef(new Animated.Value(height)).current;

  const { data, isLoading } = useQuery({
    queryKey: ["make"],
    queryFn: async () => {
      const result = await axios.get(
        "https://www.carqueryapi.com/api/0.3/?cmd=getMakes"
      );
      return result.data;
    },
  });

  const makes = data?.Makes;

  const { carState, dispatch } = useCar();

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

  let filteredMakes;
  if (searchText && makes) {
    filteredMakes = makes.filter((make) =>
      make.make_display.toLowerCase().includes(searchText.toLowerCase())
    );
  } else {
    filteredMakes = makes;
  }

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
          <Text style={styles.lineText2}>Company</Text>
          <View style={styles.line} />
        </View>

        <View style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:height*0.65}}>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={openBottomSheet}
          activeOpacity={0.7}
        >
          <TextInput
            style={styles.input}
            placeholder="Search car make"
            placeholderTextColor="#999"
            value={inputValue}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton style={styles.button} title="Next" onPress={onNext} />
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
                                                  backgroundColor= "rgba(0,0,0,0.5)" 
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
                      <Text style={styles.bottomSheetTitle}>Select Car Make</Text>
                      <TouchableOpacity onPress={closeBottomSheet}>
                        <Text style={styles.closeButton}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search car make"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus={false}
                      />
                    </View>
                    
                    {/* Car makes list */}
                    {isLoading ? (
                      <ActivityIndicator size="large" color={GlobalStyles.colors.ButtonColor} style={styles.loader} />
                    ) : (
                      <FlatList
                        data={filteredMakes}
                        keyExtractor={(item) => item.make_id}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => onChangeCarMake(item.make_display)}>
                            <Text
                              style={[
                                styles.entityText,
                                carState.carDetails.make === item.make_display && styles.selectedText,
                              ]}
                            >
                              {item.make_display}
                            </Text>
                            <View style={styles.separator} />
                          </TouchableOpacity>
                        )}
                        style={styles.makesList}
                      />
                    )}
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
    backgroundColor:"#fff",
   

    
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
    height: height * 0.65, 
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
});

export default CarDetails1;