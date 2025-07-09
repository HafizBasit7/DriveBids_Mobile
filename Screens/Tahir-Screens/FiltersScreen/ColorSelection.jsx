import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StatusBar } from "react-native";
import { Icon } from "react-native-elements";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const ColorSelection = ({ colors, selectedColor, setSelectedColor }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectColor = (color) => {
    setSelectedColor(color);
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Color</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "#0066cc" }}>Select </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
            padding: 12,
          borderRadius: 8,
          borderWidth: 0.2,
          borderColor: "#000",
          margin: 3,
          backgroundColor: selectedColor ? GlobalStyles.colors.ButtonColor : "#fff",
          width: selectedColor ?100 : "",

        }}
      >
        <Text
          style={{
            color: selectedColor ? "#ffffff" : "#666",
            fontWeight: "bold",
            textAlign:selectedColor ? "center":"" ,

          }}
        >
          {selectedColor || "Select Color..."}
        </Text>
      </TouchableOpacity>

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Color</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" type="material" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={colors}
              keyExtractor={(item) => item}
              numColumns={3}  
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
                      selectedColor === item ? GlobalStyles.colors.ButtonColor : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => selectColor(item)}  // Select color
                >
                  <Text
                    style={{
                      color: selectedColor === item ? "#ffffff" : "#333333",
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

export default ColorSelection;
