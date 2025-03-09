import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import SectionHeader from "../CustomComponents/SectionHeader";
import { GlobalStyles } from "../Styles/GlobalStyles";
import DraftCard from "../CustomComponents/DraftCard";

const Draft = () => {
  const carList = [
    {
      id: "1",
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
    },
    {
      id: "2",
      regNumber: "J 67890",
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
    },
    {
      id: "3",
      regNumber: "J 54321",
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
    },
  ];

  return (
    <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "#ffff" }}>
      <SectionHeader title="Drafts" />
      <FlatList
        data={carList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DraftCard
            regNumber={item.regNumber}
            imageUrl={item.imageUrl}
            statusList={item.statusList}
            onCompleteRegistration={() =>
              Alert.alert(`Registration Completed for ${item.regNumber}!`)
            }
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Draft;
