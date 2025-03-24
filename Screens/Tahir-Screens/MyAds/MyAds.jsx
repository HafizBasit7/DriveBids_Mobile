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
import Header from "../../../CustomComponents/Header";
import { useQuery } from "@tanstack/react-query";
import { listMyAds } from "../../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";
import { getCarsIdInWatchList } from "../../../API_Callings/R1_API/Watchlist";

export default MyAds = () => {
  
  //My ads query
  const {data, isLoading} = useQuery({
    queryKey: ['myAds'],
    queryFn: () => listMyAds(1, 10)
  });

  //Car ids in watchlist
  const {data: carsInWatchList} = useQuery({
      queryKey: ['carsInWatchList'],
      queryFn: getCarsIdInWatchList,
  });

  const cars = data?.data?.cars;

  var CARD_HEIGHT = 150;

  return (
    <>
      <Header/>
      <View style={styles.container}>
      <SectionHeader title={"My Ads"} />
      {isLoading && <ActivityIndicator/>}

      {(!isLoading && cars) && (
        <FlatList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <HomeCarCard
              CardWidth={280}
              imgHeight={170}
              ad={item}
              notHome={true}
              carsInWatchList={carsInWatchList}
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
        />
      )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
