import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";

const MakeSelection = ({ makes, selectedMakes, setSelectedMakes }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [makeSearch, setMakeSearch] = useState("");

  const filteredMakes = makes.filter((make) =>
    make.toLowerCase().includes(makeSearch.toLowerCase())
  );

  const selectMake = (make) => {
    if (!selectedMakes.includes(make)) {
      setSelectedMakes([...selectedMakes, make]);
    }
    setMakeSearch("");
  };

  const removeMake = (make) => {
    setSelectedMakes(selectedMakes.filter((item) => item !== make));
  };

  return (
    
    <View>
      {/* Make Section */}
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Make</Text>

        {/* Button to Open Bottom Sheet */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#666" }}>
            {selectedMakes.length > 0 ? selectedMakes.join(", ") : "Select Make"}
          </Text>
        </TouchableOpacity>
      </View>

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
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Make</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" type="material" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                marginBottom: 10,
              }}
              placeholder="Search for make..."
              value={makeSearch}
              onChangeText={setMakeSearch}
            />

            {/* Selected Makes */}
            {selectedMakes.length > 0 && (
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
                {selectedMakes.map((make) => (
                  <View
                    key={make}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#e0e0e0",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 15,
                      margin: 5,
                    }}
                  >
                    <Text style={{ marginRight: 5 }}>{make}</Text>
                    <TouchableOpacity onPress={() => removeMake(make)}>
                      <Icon name="close" type="material" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Search Results */}
            <FlatList
              data={filteredMakes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                  }}
                  onPress={() => selectMake(item)}
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

export default MakeSelection;
