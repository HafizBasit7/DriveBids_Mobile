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
import { useQuery } from "@tanstack/react-query";
import { listCars } from "../../../API_Callings/R1_API/Car";
import { getCarsIdInWatchList } from "../../../API_Callings/R1_API/Watchlist";

export default Home = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['cars'],
    queryFn: () => listCars(1, 10, 'recent'),
  });

  const {data: carsInWatchList, isLoading: watchlistLoading} = useQuery({
    queryKey: ['carsInWatchList'],
    queryFn: getCarsIdInWatchList,
  });

  const {data: endingCarList, isLoading: endingCarListLoading} = useQuery({
    queryKey: ['carsEnding'],
    queryFn: () => listCars(1, 10, 'ending')
  });
  

  if(isLoading) {
    return null;
  }

  if(endingCarListLoading) {
    return null;
  }
  
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
        <SectionHeader marginCustom={20} title={"Spotlight Deals"} />

        <FlatList
          data={data.data.cars}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <HomeCarCard
              onViewPress={() => {
                console.log("View Ad from Home");
              }}
              ad={item}
              carsInWatchList={carsInWatchList}
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
          data={endingCarList.data.cars}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <HomeCarCard
              onViewPress={() => {
                console.log("View Ad from Home");
              }}
              carsInWatchList={carsInWatchList}
              ad={item}
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
          data={data.data.cars}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <HomeCarCard
              onViewPress={() => {
                console.log("View Ad from Home");
              }}
              carsInWatchList={carsInWatchList}
              ad={item}
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
