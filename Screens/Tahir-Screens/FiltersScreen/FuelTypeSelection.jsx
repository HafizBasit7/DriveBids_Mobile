import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StatusBar } from "react-native";
import { Icon } from "react-native-elements";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const FuelTypeSelection = ({ fuelTypes, selectedFuel, setSelectedFuel }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectFuelType = (fuel) => {
    setSelectedFuel(fuel);
    setModalVisible(false);  
  };
    useEffect(() => {
      if (modalVisible) {
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.4)", true);
      } else {
        StatusBar.setBackgroundColor("transparent", true);
      }
    }, [modalVisible]);

  return (
    <View style={{paddingBottom:10}}>
     
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Fuel Type</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "#0066cc" }}>Select </Text>
        </TouchableOpacity>
      </View>

      {/* Selected Fuel Type */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
            padding: 12,
            borderRadius: 8,
            borderWidth: 0.2,
            borderColor: "#000",
            margin: 3,
            backgroundColor: selectedFuel ? GlobalStyles.colors.ButtonColor : "#fff",
            width: selectedFuel ? 100 : "",
        }}
      >
        <Text
          style={{
            color: selectedFuel ? "#ffffff" : "#666",
            fontWeight: "bold",
            textAlign:selectedFuel ? "center":"" ,

          }}
        >
          {selectedFuel || "Select Fuel..."}
        </Text>
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}  // Close modal on request
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.4)",  // Semi-transparent background
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: "80%",  // Restrict modal height to 80% of the screen
            }}
          >
            {/* Modal Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Fuel Type</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" type="material" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Fuel Type Tiles List */}
            <FlatList
              data={fuelTypes}
              keyExtractor={(item) => item}
              numColumns={3}  // Display fuel types in 3 columns
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: "30%",  // 3 items per row
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    borderWidth: 0.2,
                    borderColor: "#000",
                    margin: 3,
                    backgroundColor:
                      selectedFuel === item ? GlobalStyles.colors.ButtonColor : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => selectFuelType(item)}  // Select fuel type
                >
                  <Text
                    style={{
                      color: selectedFuel === item ? "#ffffff" : "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FuelTypeSelection;
