import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";

const MakeSelection = ({ makes, selectedMakes, setSelectedMakes }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [makeSearch, setMakeSearch] = useState("");

  const filteredMakes = makes.filter((make) =>
    make.toLowerCase().includes(makeSearch.toLowerCase())
  );

  const selectMake = (make) => {
    setSelectedMakes(make);
    setModalVisible(false);
    setMakeSearch("");
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
    <View style={{ paddingBottom: 10 }}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          Make
        </Text>

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
            {selectedMakes ? selectedMakes : "Select Make..."}
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
              minHeight: "80%",
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
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Select Make
              </Text>
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

            {/* Search Results or No Results */}
            {filteredMakes.length > 0 ? (
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
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={{ alignItems: "center", padding: 20 }}>
                <Text style={{ color: "#888" }}>No make found </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MakeSelection;
