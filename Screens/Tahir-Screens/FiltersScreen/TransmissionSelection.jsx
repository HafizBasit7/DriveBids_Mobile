import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StatusBar } from "react-native";
import { Icon } from "react-native-elements";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const TransmissionSelection = ({ transmissionTypes, selectedTransmission, setSelectedTransmission }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectTransmission = (transmission) => {
    setSelectedTransmission(transmission);
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Transmission</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "#0066cc" }}>Select </Text>
        </TouchableOpacity>
      </View>

      {/* Selected Transmission */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          padding:12,
          borderRadius: 8,
          borderWidth: 0.2,
          borderColor: "#000",
          margin: 3,
          backgroundColor: selectedTransmission ? GlobalStyles.colors.ButtonColor : "#fff",
          width: selectedTransmission ?100 : "",
        }}
      >
        <Text
          style={{
            color: selectedTransmission ? "#ffffff" : "#666",
            fontWeight: "bold",
            textAlign:selectedTransmission ? "center":"" ,

          }}
        >
          {selectedTransmission || "Select Transmission..."}
        </Text>
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: "80%",
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
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Transmission</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" type="material" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Transmission Types List */}
            <FlatList
              data={transmissionTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                  }}
                  onPress={() => selectTransmission(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransmissionSelection;
