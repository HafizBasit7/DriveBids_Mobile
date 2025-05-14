import React, { useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Or use 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useAuth } from "../../R1_Contexts/authContext";
import { useQueryClient } from "@tanstack/react-query";

const ChangeLocationScreen = () => {
  const navigation = useNavigation();
  const { authState, dispatch } = useAuth();
  const queryClient = useQueryClient();
  const inputRef = useRef(null);

  const currentSelectedLocation =
    authState.selectedLocation?.name || authState.user.location?.name;

  const predefinedPlaces = [
    {
      description: "Pakistan ",
      geometry: { location: { lat: 30.3753, lng: 69.3451 } },
    },
    {
      description: "Dubai ",
      geometry: { location: { lat: 25.2048, lng: 55.2708 } },
    },
    {
      description: "Abu Dhabi ",
      geometry: { location: { lat: 24.4539, lng: 54.3773 } },
    },
    {
      description: "Sharjah ",
      geometry: { location: { lat: 25.3562, lng: 55.4272 } },
    },
  ];
  useEffect(() => {
    // Focus input when component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // Slight delay to ensure component is mounted

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.safeArea}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Location</Text>
      </View>

      <View style={styles.container}>
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          ref={inputRef}
          placeholder="Enter / Search Location"
          fetchDetails={true}
          onPress={(data, details) => {
            const updateLocation = {
              name: data.description,
              coordinates: [
                details.geometry.location.lng,
                details.geometry.location.lat,
              ],
            };
            dispatch({ type: "updateLocation", payload: updateLocation });
            navigation.goBack();
            setTimeout(() => {
              queryClient.invalidateQueries({ queryKey: ["cars"] });
              queryClient.invalidateQueries({ queryKey: ["carsEnding"] });
              queryClient.invalidateQueries({ queryKey: ["carsByBidCount"] });
              queryClient.invalidateQueries({ queryKey: ["carsAll"] });
              queryClient.invalidateQueries({ queryKey: ["carsEndingAll"] });
              queryClient.invalidateQueries({
                queryKey: ["carsByBidCountAll"],
              });
            }, 200);
          }}
          query={{
            key: "AIzaSyC2oZNWzhuw6yjImkFYSvZ3miShktBq0gI",
            language: "en",
          }}
          predefinedPlaces={predefinedPlaces}
          predefinedPlacesAlwaysVisible={true}
          textInputProps={{
            placeholder: currentSelectedLocation,
            placeholderTextColor: "#888",
          }}
          autoFillOnNotFound={false}
          currentLocation={false}
          currentLocationLabel="Current location"
          disableScroll={false}
          enableHighAccuracyLocation={true}
          filterReverseGeocodingByTypes={[]}
          GooglePlacesDetailsQuery={{}}
          GooglePlacesSearchQuery={{
            rankby: "distance",
            type: "restaurant",
          }}
          GoogleReverseGeocodingQuery={{}}
          isRowScrollable={true}
          keyboardShouldPersistTaps="always"
          listHoverColor="#ececec"
          listUnderlayColor="#c8c7cc"
          keepResultsAfterBlur={false}
          minLength={0}
          nearbyPlacesAPI="GooglePlacesSearch"
          numberOfLines={1}
          onNotFound={() => {}}
          onTimeout={() =>
            console.warn("google places autocomplete: request timeout")
          }
          suppressDefaultStyles={false}
          textInputHide={false}
          timeout={20000}
          isNewPlacesAPI={false}
          fields="*"
          styles={{
            container: {
              flex: 0,
            },
            textInputContainer: {
              backgroundColor: "#fff",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#e0e0e0",
              marginHorizontal: 15,
              marginTop: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              elevation: 1,
            },
            textInput: {
              height: 50,
              color: "#333",
              fontSize: 16,
              paddingHorizontal: 15,
              borderRadius: 10,
            },
            listView: {
              backgroundColor: "#fff",
              marginHorizontal: 15,
              borderRadius: 10,
              elevation: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              marginTop: 5,
            },
            row: {
              padding: 13,
              height: 44,
              flexDirection: "row",
            },
            separator: {
              height: 0.5,
              backgroundColor: "#c8c7cc",
            },
            description: {
              fontSize: 14,
              color: "#555",
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FEE226",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ChangeLocationScreen;
