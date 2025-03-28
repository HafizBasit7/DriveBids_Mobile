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
import { useNavigation } from '@react-navigation/native';
import Header from "../../../CustomComponents/Header"; 
import { FilterStyles } from "./StyleSheetFilters";

const FiltersScreen = () => {
  const styles = FilterStyles;
  const navigation = useNavigation();

  // State for filter values
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [makeSearch, setMakeSearch] = useState("");
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [model, setModel] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [mileageRange, setMileageRange] = useState({ min: "", max: "" });
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [horsePowerRange, setHorsePowerRange] = useState({ min: "", max: "" });

  // Predefined lists for filtering
  const conditions = ['Poor', 'Fair', 'Good', 'Excellent'];
  const cities = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain"];
  const fuelTypes = ['Petrol', 'Diesel', 'HI-Octane', 'Electric', 'Hybrid'];
  const colors = ["White", "Black", "Silver", "Red", "Blue", "Grey"];
  const transmissionTypes = ['AGS', 'Manual', 'CVT', 'DCT', 'AMT', 'EV Single-Speed'];

  // Dummy data for make suggestions
  const allMakes = [
    "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", 
    "Kia", "Mazda", "Subaru", "Volkswagen", "BMW", "Mercedes-Benz", 
    "Audi", "Lexus", "Acura", "Jeep", "Tesla", "Porsche"
  ];

  // Filter makes based on search input
  const filteredMakes = allMakes.filter((make) =>
    make.toLowerCase().includes(makeSearch.toLowerCase())
  );

  // Select a make from the dropdown
  const selectMake = (make) => {
    if (!selectedMakes.includes(make)) {
      setSelectedMakes([...selectedMakes, make]);
    }
    setMakeSearch("");
    Keyboard.dismiss();
  };

  // Remove a selected make
  const removeMake = (make) => {
    setSelectedMakes(selectedMakes.filter((item) => item !== make));
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setMakeSearch("");
    setSelectedMakes([]);
    setModel("");
    setSelectedCondition("");
    setSelectedCity("");
    setMileageRange({ min: "", max: "" });
    setSelectedFuel("");
    setSelectedColor("");
    setSelectedTransmission("");
    setHorsePowerRange({ min: "", max: "" });
  };

  // Apply filters
  const applyFilters = () => {
    // Prepare filter object to pass to next screen
    const filters = {
      make: selectedMakes.length > 0 ? selectedMakes[0] : undefined,
      model: model || undefined,
      minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
      maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
      condition: selectedCondition || undefined,
      city: selectedCity || undefined,
      minMileage: mileageRange.min ? parseFloat(mileageRange.min) : undefined,
      maxMileage: mileageRange.max ? parseFloat(mileageRange.max) : undefined,
      fuel: selectedFuel || undefined,
      color: selectedColor || undefined,
      transmission: selectedTransmission || undefined,
      minHorsePower: horsePowerRange.min ? parseFloat(horsePowerRange.min) : undefined,
      maxHorsePower: horsePowerRange.max ? parseFloat(horsePowerRange.max) : undefined
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

    navigation.navigate('Filters_ViewAll', { filters });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header showSearch={false}/>
      <Text style={styles.header}>Filters</Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range (AED)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.input}
              placeholder="Min"
              value={priceRange.min}
              onChangeText={(text) => setPriceRange({ ...priceRange, min: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Max"
              value={priceRange.max}
              onChangeText={(text) => setPriceRange({ ...priceRange, max: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Make */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Make</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for make..."
            value={makeSearch}
            onChangeText={setMakeSearch}
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
          {makeSearch.length > 0 && (
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
        </View>

        {/* Model */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Model</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter model..."
            value={model}
            onChangeText={setModel}
          />
        </View>

        {/* Condition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condition</Text>
          {conditions.map((condition) => (
            <TouchableOpacity
              key={condition}
              style={styles.radioButton}
              onPress={() => setSelectedCondition(condition)}
            >
              <Icon
                name={selectedCondition === condition 
                  ? "radio-button-checked" 
                  : "radio-button-unchecked"}
                type="material"
                size={24}
                color={selectedCondition === condition ? "#0066cc" : "#aaaaaa"}
              />
              <Text style={styles.radioButtonText}>{condition}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* City */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>City</Text>
          {cities.map((city) => (
            <TouchableOpacity
              key={city}
              style={styles.radioButton}
              onPress={() => setSelectedCity(city)}
            >
              <Icon
                name={selectedCity === city 
                  ? "radio-button-checked" 
                  : "radio-button-unchecked"}
                type="material"
                size={24}
                color={selectedCity === city ? "#0066cc" : "#aaaaaa"}
              />
              <Text style={styles.radioButtonText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mileage Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mileage (KMs)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.input}
              placeholder="Min"
              value={mileageRange.min}
              onChangeText={(text) => setMileageRange({ ...mileageRange, min: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Max"
              value={mileageRange.max}
              onChangeText={(text) => setMileageRange({ ...mileageRange, max: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Fuel Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fuel Type</Text>
          {fuelTypes.map((fuel) => (
            <TouchableOpacity
              key={fuel}
              style={styles.radioButton}
              onPress={() => setSelectedFuel(fuel)}
            >
              <Icon
                name={selectedFuel === fuel 
                  ? "radio-button-checked" 
                  : "radio-button-unchecked"}
                type="material"
                size={24}
                color={selectedFuel === fuel ? "#0066cc" : "#aaaaaa"}
              />
              <Text style={styles.radioButtonText}>{fuel}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Color */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={styles.radioButton}
              onPress={() => setSelectedColor(color)}
            >
              <Icon
                name={selectedColor === color 
                  ? "radio-button-checked" 
                  : "radio-button-unchecked"}
                type="material"
                size={24}
                color={selectedColor === color ? "#0066cc" : "#aaaaaa"}
              />
              <Text style={styles.radioButtonText}>{color}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transmission */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transmission</Text>
          {transmissionTypes.map((transmission) => (
            <TouchableOpacity
              key={transmission}
              style={styles.radioButton}
              onPress={() => setSelectedTransmission(transmission)}
            >
              <Icon
                name={selectedTransmission === transmission 
                  ? "radio-button-checked" 
                  : "radio-button-unchecked"}
                type="material"
                size={24}
                color={selectedTransmission === transmission ? "#0066cc" : "#aaaaaa"}
              />
              <Text style={styles.radioButtonText}>{transmission}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Horse Power Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horse Power</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.input}
              placeholder="Min"
              value={horsePowerRange.min}
              onChangeText={(text) => setHorsePowerRange({ ...horsePowerRange, min: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Max"
              value={horsePowerRange.max}
              onChangeText={(text) => setHorsePowerRange({ ...horsePowerRange, max: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Extra space at the bottom */}
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