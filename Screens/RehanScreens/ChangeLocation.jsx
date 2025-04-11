import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Or use 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useAuth } from '../../R1_Contexts/authContext';
import {useQueryClient} from "@tanstack/react-query";

const ChangeLocationScreen = () => {
  const navigation = useNavigation();
  const {authState, dispatch} = useAuth();
  const queryClient = useQueryClient();

  const currentSelectedLocation = authState.selectedLocation?.name || authState.user.location?.name;

  const predefinedPlaces = [
    {
      description: 'Pakistan ',
      geometry: { location: { lat: 30.3753, lng: 69.3451 } },
    },
    {
      description: 'Dubai ',
      geometry: { location: { lat: 25.2048, lng: 55.2708 } },
    },
    {
      description: 'Abu Dhabi ',
      geometry: { location: { lat: 24.4539, lng: 54.3773 } },
    },
    {
      description: 'Sharjah ',
      geometry: { location: { lat: 25.3562, lng: 55.4272 } },
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Location</Text>
      </View>

      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Enter / Search Location"
          fetchDetails={true}
        //   currentLocation={true}
        //   currentLocationLabel="Current Location"
          onPress={(data, details) => {
            const updateLocation = {
              name: data.description,
              coordinates: [
                details.geometry.location.lng,
                details.geometry.location.lat,
              ],
            };
            dispatch({type: 'updateLocation', payload: updateLocation});
            navigation.goBack();
            setTimeout(() => {
              //Main Page
              queryClient.invalidateQueries(['cars']);
              queryClient.invalidateQueries(['carsByBidCount']);
              queryClient.invalidateQueries(['carsEnding']);
              //All page
              queryClient.invalidateQueries(['carsAll']);
              queryClient.invalidateQueries(['carsByBidCountAll']);
              queryClient.invalidateQueries(['carsEndingAll']);
              }, 200);
          }}
          query={{
            key: 'AIzaSyC2oZNWzhuw6yjImkFYSvZ3miShktBq0gI',
            language: 'en',
          }}
          predefinedPlaces={predefinedPlaces}
          predefinedPlacesAlwaysVisible={true}
          textInputProps={{
            placeholder: currentSelectedLocation,
          }}
          styles={{
            listView: {
              marginHorizontal:12
            },
            textInputContainer: {
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              paddingHorizontal: 3,
              marginBottom: 5,
              marginHorizontal: 20,
              marginTop: 25,
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FEE226',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
    paddingTop:20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ChangeLocationScreen;
