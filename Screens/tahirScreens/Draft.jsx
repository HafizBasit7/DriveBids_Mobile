import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import SectionHeader from "../../CustomComponents/tahirComponents/SectionHeader";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import DraftCard from "../../CustomComponents/tahirComponents/DraftCard";

const Draft = () => {
  const carData = {
    regNumber: "J 12345",
    imageUrl:
      "https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png", // Replace with actual image URL
    statusList: [
      { label: "Car Images", completed: true },
      { label: "Car Features", completed: true },
      { label: "Car Pricing", completed: false },
      { label: "Damage Report", completed: false },
      { label: "Car Detail", completed: false },
      { label: "Inspection Report", completed: false },
    ],
  };

  return (
    <View>
      <DraftCard
        regNumber={carData.regNumber}
        imageUrl={carData.imageUrl}
        statusList={carData.statusList}
        onCompleteRegistration={() => Alert.alert("Registration Completed!")}
      />
    </View>
  );
};

export default Draft;
