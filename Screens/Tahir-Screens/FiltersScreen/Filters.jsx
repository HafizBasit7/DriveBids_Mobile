import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import SectionCheckBoxes from "./SectionCheckBoxes";
import { FilterStyles } from "./StyleSheetFilters";
import details from "./InitialDetails";

const FiltersScreen = () => {
  const styles = FilterStyles;
  const scrollViewRef = useRef(null);

  // State for filter values
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [yearRange, setYearRange] = useState({ from: "", to: "" });
  const [mileageRange, setMileageRange] = useState({ min: "", max: "" });
  const [makeSearch, setMakeSearch] = useState("");
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [showMakeResults, setShowMakeResults] = useState(false);

  // Location search
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState(["New York, NY"]);

  // Additional filters
  const [bodyType, setBodyType] = useState(details.bodyType);
  const [fuelType, setFuelType] = useState(details.fuelType);
  const [transmission, setTransmission] = useState(details.transmission);
  const [driveTrain, setDriveTrain] = useState(details.driveTrain);
  const [condition, setCondition] = useState(details.condition);
  const [auctionStatus, setAuctionStatus] = useState(details.auctionStatus);
  const [sellerType, setSellerType] = useState(details.sellerType);
  const [locations, setLocations] = useState(details.locations);
  const [makes, setMakes] = useState(details.makes);
  const [registeredIn, setRegisteredIn] = useState(details.registeredIn);
  // Dummy data for make suggestions
  const allMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mazda",
    "Subaru",
    "Volkswagen",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Lexus",
    "Acura",
    "Jeep",
    "Chrysler",
    "Dodge",
    "GMC",
    "Buick",
    "Tesla",
    "Porsche",
    "Jaguar",
    "Land Rover",
    "Volvo",
    "Lamborghini",
    "Ferrari",
    "Maserati",
    "Bentley",
    "Rolls-Royce",
  ];

  // Dummy data for location suggestions
  const allLocations = Object.keys(locations);

  // Filter makes based on search input
  const filteredMakes = allMakes.filter((make) =>
    make.toLowerCase().includes(makeSearch.toLowerCase())
  );

  // Filter locations based on search input
  const filteredLocations = allLocations.filter((location) =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Toggle checkbox for body type
  const toggleBodyType = (type) => {
    setBodyType({
      ...bodyType,
      [type]: !bodyType[type],
    });
  };

  // Toggle checkbox for fuel type
  const toggleFuelType = (type) => {
    setFuelType({
      ...fuelType,
      [type]: !fuelType[type],
    });
  };

  // Toggle checkbox for transmission
  const toggleTransmission = (type) => {
    setTransmission({
      ...transmission,
      [type]: !transmission[type],
    });
  };

  // Toggle checkbox for drive train
  const toggleDriveTrain = (type) => {
    setDriveTrain({
      ...driveTrain,
      [type]: !driveTrain[type],
    });
  };

  // Toggle checkbox for condition
  const toggleCondition = (type) => {
    setCondition({
      ...condition,
      [type]: !condition[type],
    });
  };

  // Toggle checkbox for auction status
  const toggleAuctionStatus = (status) => {
    setAuctionStatus({
      ...auctionStatus,
      [status]: !auctionStatus[status],
    });
  };

  // Toggle checkbox for seller type
  const toggleSellerType = (type) => {
    setSellerType({
      ...sellerType,
      [type]: !sellerType[type],
    });
  };

  // Toggle checkbox for locations
  const toggleLocation = (location) => {
    // Update the checkbox state
    setLocations({
      ...locations,
      [location]: !locations[location],
    });

    // Update selected locations list
    if (locations[location]) {
      // If it was checked, now it's unchecked - remove from selected
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    } else {
      // If it was unchecked, now it's checked - add to selected
      if (!selectedLocations.includes(location)) {
        setSelectedLocations([...selectedLocations, location]);
      }
    }
  };

  // Toggle checkbox for make
  const toggleMake = (make) => {
    setMakes({
      ...makes,
      [make]: !makes[make],
    });
  };

  // Toggle checkbox for registered in
  const toggleRegisteredIn = (state) => {
    setRegisteredIn({
      ...registeredIn,
      [state]: !registeredIn[state],
    });
  };

  // Select a make from the dropdown
  const selectMake = (make) => {
    if (!selectedMakes.includes(make)) {
      setSelectedMakes([...selectedMakes, make]);
    }
    setMakeSearch("");
    setShowMakeResults(false);
    Keyboard.dismiss();
  };

  // Select a location from the dropdown
  const selectLocation = (location) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);

      // Also update the checkbox
      setLocations({
        ...locations,
        [location]: true,
      });
    }
    setLocationSearch("");
    setShowLocationResults(false);
    Keyboard.dismiss();
  };

  // Remove a selected make
  const removeMake = (make) => {
    setSelectedMakes(selectedMakes.filter((item) => item !== make));
  };

  // Remove a selected location
  const removeLocation = (location) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location));

    // Also update the checkbox
    setLocations({
      ...locations,
      [location]: false,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setYearRange({ from: "", to: "" });
    setMileageRange({ min: "", max: "" });
    setMakeSearch("");
    setSelectedMakes([]);
    setLocationSearch("");
    setSelectedLocations(["New York, NY"]);

    // Reset all checkboxes
    const resetLocations = Object.keys(locations).reduce((acc, location) => {
      acc[location] = false;
      return acc;
    }, {});
    resetLocations["New York, NY"] = true; // Keep default selected
    setLocations(resetLocations);

    setMakes(
      Object.keys(makes).reduce((acc, make) => {
        acc[make] = false;
        return acc;
      }, {})
    );

    setRegisteredIn(
      Object.keys(registeredIn).reduce((acc, state) => {
        acc[state] = false;
        return acc;
      }, {})
    );

    setBodyType(
      Object.keys(bodyType).reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {})
    );

    setFuelType(
      Object.keys(fuelType).reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {})
    );

    setTransmission(
      Object.keys(transmission).reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {})
    );

    setDriveTrain(
      Object.keys(driveTrain).reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {})
    );

    setCondition(
      Object.keys(condition).reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {})
    );

    setAuctionStatus(
      Object.keys(auctionStatus).reduce((acc, status) => {
        acc[status] = false;
        return acc;
      }, {})
    );

    setSellerType(
      Object.keys(sellerType).reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {})
    );
  };

  // Apply filters
  const applyFilters = () => {
    // Here you would typically call an API or dispatch an action with the filters
    console.log({
      priceRange,
      yearRange,
      mileageRange,
      selectedLocations,
      makes: Object.keys(makes).filter((make) => makes[make]),
      selectedMakes,
      registeredIn: Object.keys(registeredIn).filter(
        (state) => registeredIn[state]
      ),
      bodyType: Object.keys(bodyType).filter((type) => bodyType[type]),
      fuelType: Object.keys(fuelType).filter((type) => fuelType[type]),
      transmission: Object.keys(transmission).filter(
        (type) => transmission[type]
      ),
      driveTrain: Object.keys(driveTrain).filter((type) => driveTrain[type]),
      condition: Object.keys(condition).filter((type) => condition[type]),
      auctionStatus: Object.keys(auctionStatus).filter(
        (status) => auctionStatus[status]
      ),
      sellerType: Object.keys(sellerType).filter((type) => sellerType[type]),
    });
    // You could also navigate back to results screen
    // navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.header}>Filters</Text>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range ($)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.input}
              placeholder="Min"
              value={priceRange.min}
              onChangeText={(text) =>
                setPriceRange({ ...priceRange, min: text })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Max"
              value={priceRange.max}
              onChangeText={(text) =>
                setPriceRange({ ...priceRange, max: text })
              }
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Year Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Year</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.input}
              placeholder="From"
              value={yearRange.from}
              onChangeText={(text) =>
                setYearRange({ ...yearRange, from: text })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="To"
              value={yearRange.to}
              onChangeText={(text) => setYearRange({ ...yearRange, to: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Mileage Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mileage (KMs)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.input}
              placeholder="Min"
              value={mileageRange.min}
              onChangeText={(text) =>
                setMileageRange({ ...mileageRange, min: text })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Max"
              value={mileageRange.max}
              onChangeText={(text) =>
                setMileageRange({ ...mileageRange, max: text })
              }
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>

          {/* Location Search */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search for location..."
            value={locationSearch}
            onChangeText={(text) => {
              setLocationSearch(text);
              setShowLocationResults(text.length > 0);
            }}
          />

          {/* Selected Locations */}
          {selectedLocations.length > 0 && (
            <View style={styles.chipContainer}>
              {selectedLocations.map((location) => (
                <View key={location} style={styles.chip}>
                  <Text style={styles.chipText}>{location}</Text>
                  <TouchableOpacity onPress={() => removeLocation(location)}>
                    <Icon name="close" type="material" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Location Search Results */}
          {showLocationResults && filteredLocations.length > 0 && (
            <View style={styles.searchResults}>
              {filteredLocations.map((location) => (
                <TouchableOpacity
                  key={location}
                  style={styles.searchResultItem}
                  onPress={() => selectLocation(location)}
                >
                  <Text style={styles.searchResultText}>{location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Location Checkboxes */}
          {Object.keys(locations).map((location) => (
            <CheckBox
              key={location}
              title={location}
              checked={locations[location]}
              onPress={() => toggleLocation(location)}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              checkedIcon={
                <Icon
                  name="check-box"
                  type="material"
                  size={24}
                  color="#0066cc"
                />
              }
              uncheckedIcon={
                <Icon
                  name="check-box-outline-blank"
                  type="material"
                  size={24}
                  color="#aaaaaa"
                />
              }
            />
          ))}
        </View>

        {/* Make Search */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Make</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for make..."
            value={makeSearch}
            onChangeText={(text) => {
              setMakeSearch(text);
              setShowMakeResults(text.length > 0);
            }}
          />

          {/* Selected Makes */}
          {selectedMakes.length > 0 && (
            <View style={styles.chipContainer}>
              {selectedMakes.map((make) => (
                <View key={make} style={styles.chip}>
                  <Text style={styles.chipText}>{make}</Text>
                  <TouchableOpacity onPress={() => removeMake(make)}>
                    <Icon name="close" type="material" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Make Search Results */}
          {showMakeResults && filteredMakes.length > 0 && (
            <View style={styles.searchResults}>
              {filteredMakes.map((make) => (
                <TouchableOpacity
                  key={make}
                  style={styles.searchResultItem}
                  onPress={() => selectMake(make)}
                >
                  <Text style={styles.searchResultText}>{make}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Make Checkboxes */}
          {Object.keys(makes).map((make) => (
            <CheckBox
              key={make}
              title={make}
              checked={makes[make]}
              onPress={() => toggleMake(make)}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              checkedIcon={
                <Icon
                  name="check-box"
                  type="material"
                  size={24}
                  color="#0066cc"
                />
              }
              uncheckedIcon={
                <Icon
                  name="check-box-outline-blank"
                  type="material"
                  size={24}
                  color="#aaaaaa"
                />
              }
            />
          ))}
        </View>

        <SectionCheckBoxes
          Type={bodyType}
          toogleType={toggleBodyType}
          styles={styles}
          title={"Body Type"}
        />

        {/* Fuel Type */}
        <SectionCheckBoxes
          Type={fuelType}
          toogleType={toggleFuelType}
          styles={styles}
          title={"Fuel Type"}
        />

        {/* Transmission */}
        <SectionCheckBoxes
          Type={transmission}
          toogleType={toggleTransmission}
          styles={styles}
          title={"Transmission"}
        />

        {/* Drive Train */}
        <SectionCheckBoxes
          Type={driveTrain}
          toogleType={toggleDriveTrain}
          styles={styles}
          title={"Drive Train"}
        />

        {/* Condition */}
        <SectionCheckBoxes
          Type={condition}
          toogleType={toggleCondition}
          styles={styles}
          title={"Condition"}
        />

        {/* Auction Status */}
        <SectionCheckBoxes
          Type={auctionStatus}
          toogleType={toggleAuctionStatus}
          styles={styles}
          title={"Auction Status"}
        />

        {/* Seller Type */}
        <SectionCheckBoxes
          Type={sellerType}
          toogleType={toggleSellerType}
          styles={styles}
          title={"Seller Type"}
        />

        {/* Registered In */}
        <SectionCheckBoxes
          Type={registeredIn}
          toogleType={toggleRegisteredIn}
          styles={styles}
          title={"Seller Type"}
        />

        {/* Extra space at the bottom to accommodate floating buttons */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Buttons */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearFilters}
        >
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.applyButton]}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FiltersScreen;
