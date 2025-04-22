import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const { height } = Dimensions.get("window");

const CarDetails2 = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(height)).current;
  const [currentStep] = useState(4);
  const totalSteps = 14;

  const navigation = useNavigation();
  const { carState, dispatch } = useCar();

  // Reference to GooglePlacesAutocomplete to clear it when needed
  const googlePlacesRef = useRef();

  const onChangeCarCity = (value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field: 'location',
      value,
    });
    closeBottomSheet();
  };

  const openBottomSheet = () => {
    // Clear previous search if ref is available
    if (googlePlacesRef.current) {
      googlePlacesRef.current.clear();
    }

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Step Progress Indicator */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText}>{`Step ${currentStep} of ${totalSteps}`}</Text>
          <View style={styles.line} />
        </View>

        {/* Section Title */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText2}>Location</Text>
          <View style={styles.line} />
        </View>

        {/* Location Input Field that opens bottom sheet */}
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: height * 0.65 }}>
          <TouchableOpacity style={styles.inputWrapper} onPress={openBottomSheet}>
            <TextInput
              style={styles.input}
              placeholder="Select location"
              placeholderTextColor="#999"
              value={carState.carDetails?.location?.name}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {/* Button to Navigate */}
          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.button}
              title="Next"
              onPress={() => navigation.navigate("CarDetails5")}
            />
          </View>
        </View>

        {/* Bottom Sheet Modal with GooglePlacesAutocomplete */}
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
                      <Text style={styles.bottomSheetTitle}>Select Location</Text>
                      <TouchableOpacity onPress={closeBottomSheet}>
                        <Text style={styles.closeButton}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    {/* GooglePlacesAutocomplete inside bottom sheet */}
                    <GooglePlacesAutocomplete
                      ref={googlePlacesRef}
                      placeholder='Search location'
                      enablePoweredByContainer={false}
                      fetchDetails={true}
                      onPress={(data, details = null) => {
                        const updateLocation = {
                          name: data.description,
                          coordinates: [
                            details.geometry.location.lng,
                            details.geometry.location.lat,
                          ]
                        };
                        onChangeCarCity(updateLocation);
                      }}
                      onFail={(error) => console.error(error)}
                      query={{
                        key: 'AIzaSyC2oZNWzhuw6yjImkFYSvZ3miShktBq0gI',
                        language: 'en',
                      }}
                      styles={{
                        container: {
                          flex: 0,
                        },
                        textInputContainer: {
                          backgroundColor: '#fff',
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#e0e0e0',
                          marginHorizontal: 15,
                          marginTop: 10,
                          marginBottom: 5,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1,
                          shadowRadius: 1,
                          elevation: 1,
                        },
                        textInput: {
                          height: 50,
                          color: '#333',
                          fontSize: 16,
                          paddingHorizontal: 15,
                          borderRadius: 10,
                        },
                        listView: {
                          backgroundColor: '#fff',
                          marginHorizontal: 15,
                          borderRadius: 10,
                          elevation: 1,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1,
                          shadowRadius: 3,
                          marginTop: 5,
                          maxHeight: height * 0.5,
                        },
                        row: {
                          padding: 13,
                          height: 'auto',
                          minHeight: 44,
                          flexDirection: 'row',
                        },
                        separator: {
                          height: 0.5,
                          backgroundColor: '#c8c7cc',
                        },
                        description: {
                          fontSize: 14,
                          color: '#555',
                        },
                      }}
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
});

export default CarDetails2;