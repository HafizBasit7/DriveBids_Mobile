import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import HomeCarCard from "../../../CustomComponents/Tahir-Components/Home/HomeCarCard";
import HomeBanner from "../../../CustomComponents/HomeBanner";
import SellerProfileCard from "../../../CustomComponents/UmairComponents/SellerProfileCard";
import WrapperComponent from "../../../CustomComponents/WrapperComponent";
import Header from "../../../CustomComponents/Header"; 


export default OwnerProfile = () => {
  const carData = [
    {
      id: "1",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      favorite: false,
    },
    {
      id: "2",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      favorite: true,
    },
    {
      id: "3",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      favorite: true,
    },
    {
      id: "4",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      favorite: true,
    },

    // Add more car objects here...
  ];
  var CARD_HEIGHT = 150;

  return (
    <>
      <Header showSearch={false}/>
      <View style={styles.container}>
        <SellerProfileCard />
        <SectionHeader title={"Adam Listings"} />
  {/* //TODO: OK */}
        {/* <FlatList
          data={carData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <HomeCarCard
              CardWidth={280}
              imgHeight={170}
              onViewPress={() => {
                console.log("Do Something from watchList");
              }}
              {...item}
            />
          )}
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
          contentContainerStyle={{
            paddingVertical: 10,

            justifyContent: "center",
            alignItems: "center",
          }} // Add vertical padding
          ItemSeparatorComponent={() => (
            <View style={{ height: 5 }} /> // Adjust spacing between items
          )}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: CARD_HEIGHT, // Adjust to item height
            offset: CARD_HEIGHT * index,
            index,
          })}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
