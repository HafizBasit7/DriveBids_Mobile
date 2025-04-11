import React from "react";
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, StatusBar } from "react-native";
import { GlobalStyles } from "../Styles/GlobalStyles";
import { Icon } from "react-native-elements";

const DialogBox = ({ visible, title, message, type, onOkPress, onCancelPress, loading }) => {
  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "info":
      default:
        return GlobalStyles.colors.ButtonColor;
    }
  };

  const getIconName = () => {
    switch (type) {
      case "success":
        return "check";
      case "error":
        return "close";
      case "info":
      default:
        return "info";
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancelPress} 
    >
         <StatusBar
              barStyle="dark-content"
              backgroundColor= "rgba(0,0,0,0.7)" 
              translucent
            />
      {/* Backdrop touch to close */}
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
        onPress={onCancelPress}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          {!loading && (
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: getTypeColor(),
                  borderRadius: 15,
                  padding: 1,
                }}
              >
                <Icon name={getIconName()} size={16} color={"white"} />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: getTypeColor(),
                  }}
                >
                  {title?.toUpperCase()}
                </Text>
              </View>
            </View>
          )}

          <Text
            style={{
              marginVertical: 15,
              textAlign: "center",
              fontSize: 14,
              fontFamily: "Inter-Regular",
            }}
          >
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : message}
          </Text>

          {!loading && (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={onOkPress}
                style={{
                  backgroundColor: GlobalStyles.colors.ButtonColor,
                  paddingVertical: 5,
                  paddingHorizontal: 30,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", fontFamily: "Inter-SemiBold" }}>
                  OK
                </Text>
              </TouchableOpacity>

              {/* Optional Cancel Button */}
              {onCancelPress && (
                <TouchableOpacity
                  onPress={onCancelPress}
                  style={{
                    backgroundColor: "#ccc",
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "black", fontFamily: "Inter-SemiBold" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DialogBox;
