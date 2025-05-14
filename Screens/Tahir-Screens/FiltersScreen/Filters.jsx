import React, { useState, useRef, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import Header from "../../../CustomComponents/Header";
import { FilterStyles } from "./StyleSheetFilters";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import MakeSection from "./MakeSlection";
import MakeSelection from "./MakeSlection";
import TransmissionSelection from "./TransmissionSelection";
import ColorSelection from "./ColorSelection";
import FuelTypeSelection from "./FuelTypeSelection";

const FiltersScreen = ({ route }) => {
  const styles = FilterStyles;
  const navigation = useNavigation();
  const fromSearch = route?.params?.fromSearch;

  // State for filter values
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [makeSearch, setMakeSearch] = useState("");
  const [selectedMakes, setSelectedMakes] = useState("");
  const [model, setModel] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [mileageRange, setMileageRange] = useState({ min: "", max: "" });
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [horsePowerRange, setHorsePowerRange] = useState({ min: "", max: "" });

  // Predefined lists for filtering
  const conditions = ["Excellent", "Poor", "Fair", "Good"];
  const fuelTypes = ["Petrol", "Diesel", "HI-Octane", "Electric", "Hybrid"];
  const colors = ["White", "Black", "Silver", "Red", "Blue", "Grey"];
  const transmissionTypes = [
    "AGS",
    "Manual",
    "CVT",
    "DCT",
    "AMT",
    "EV Single-Speed",
  ];

  const makes = [
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
    "Tesla",
    "Porsche",
  ];

  // Clear all filters
  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setMakeSearch("");
    setSelectedMakes("");
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
      make: selectedMakes,
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
      minHorsePower: horsePowerRange.min
        ? parseFloat(horsePowerRange.min)
        : undefined,
      maxHorsePower: horsePowerRange.max
        ? parseFloat(horsePowerRange.max)
        : undefined,
    };

    // Remove undefined values
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key]
    );

    navigation.navigate("Filters_ViewAll", { filters });
  };

  useEffect(() => {
    if (fromSearch) {
      const filters = {
        make: selectedMakes,
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
        minHorsePower: horsePowerRange.min
          ? parseFloat(horsePowerRange.min)
          : undefined,
        maxHorsePower: horsePowerRange.max
          ? parseFloat(horsePowerRange.max)
          : undefined,
      };

      // Remove undefined values
      Object.keys(filters).forEach(
        (key) => filters[key] === undefined && delete filters[key]
      );
      navigation.navigate("Filters_ViewAll", { filters });
    }
  }, [fromSearch]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header showSearch={false} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Filters</Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity onPress={clearFilters}>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                backgroundColor: "#fff",
                padding: 5,
                borderRadius: 5,
                paddingVertical: 7,

                borderColor: "#000",
                borderWidth: 0.2,
                fontWeight: 700,
              }}
            >
              Clear Filters{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={applyFilters}>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                backgroundColor: "#2F61BF",
                padding: 5,
                borderRadius: 5,
                paddingVertical: 7,
                width: 100,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <MakeSelection
          makes={makes}
          selectedMakes={selectedMakes}
          setSelectedMakes={setSelectedMakes}
        />

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

        <View style={{ paddingBottom: 10 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 2,
              backgroundColor: "#fff",
              borderColor: "#ddd",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Condition</Text>
          </View>

          {/* Tiles Layout */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 5 }}>
            {conditions.map((condition) => (
              <TouchableOpacity
                key={condition}
                onPress={() => setSelectedCondition(condition)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  borderWidth: 0.2,
                  borderColor: "#000",
                  margin: 3,
                  backgroundColor:
                    selectedCondition === condition
                      ? GlobalStyles.colors.ButtonColor
                      : "#fff",
                }}
              >
                <Text
                  style={{
                    color:
                      selectedCondition === condition ? "#ffffff" : "#333333",
                    fontWeight: "bold",
                  }}
                >
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ flex: 1, padding: 2 }}>
          <FuelTypeSelection
            fuelTypes={fuelTypes}
            selectedFuel={selectedFuel}
            setSelectedFuel={setSelectedFuel}
          />
        </View>

        <View style={{ flex: 1, padding: 2 }}>
          <ColorSelection
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </View>

        <View style={{ flex: 1, padding: 2 }}>
          <TransmissionSelection
            transmissionTypes={transmissionTypes}
            selectedTransmission={selectedTransmission}
            setSelectedTransmission={setSelectedTransmission}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range (AED)</Text>
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

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horse Power</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.input}
              placeholder="Min"
              value={horsePowerRange.min}
              onChangeText={(text) =>
                setHorsePowerRange({ ...horsePowerRange, min: text })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Max"
              value={horsePowerRange.max}
              onChangeText={(text) =>
                setHorsePowerRange({ ...horsePowerRange, max: text })
              }
              keyboardType="numeric"
            />
          </View>
        </View> */}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.floatingButtonContainer}></View>
    </KeyboardAvoidingView>
  );
};

export default FiltersScreen;
