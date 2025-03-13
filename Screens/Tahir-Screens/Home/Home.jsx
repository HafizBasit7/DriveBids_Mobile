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

export default Home = () => {
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
      favorite: false,
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
      favorite: false,
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
      favorite: false,
    },

    // Add more car objects here...
  ];
  const CARD_WIDTH = 230;
  const SEPARATOR_WIDTH = 10;
  const ITEM_WIDTH = CARD_WIDTH + SEPARATOR_WIDTH;

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <HomeBanner />
        <SectionHeader marginCustom={20} title={"Recommended for you"} />

        <FlatList
          data={carData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <HomeCarCard
              onViewPress={() => {
                console.log("View Ad from Home");
              }}
              {...item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 5 }} // Add padding instead of fixed height
          ItemSeparatorComponent={() => (
            <View style={{ width: SEPARATOR_WIDTH }} />
          )}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast" // Makes snapping more obvious
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
        />
        <SectionHeader title={"Ending Soonest"} />
        <FlatList
          data={carData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <HomeCarCard
              onViewPress={() => {
                console.log("View Ad from Home");
              }}
              {...item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 5 }} // Add padding instead of fixed height
          ItemSeparatorComponent={() => (
            <View style={{ width: SEPARATOR_WIDTH }} />
          )}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast" // Makes snapping more obvious
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
        />

        <SectionHeader title={"Newly Listed"} />
        <FlatList
          data={carData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <HomeCarCard
              onViewPress={() => {
                console.log("View Ad from Home");
              }}
              {...item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 5 }} // Add padding instead of fixed height
          ItemSeparatorComponent={() => (
            <View style={{ width: SEPARATOR_WIDTH }} />
          )}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast" // Makes snapping more obvious
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
