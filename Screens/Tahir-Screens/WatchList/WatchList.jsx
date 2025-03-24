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
import { getWatchList } from "../../../API_Callings/R1_API/Watchlist";
import { ActivityIndicator } from "react-native-paper";
import Header from "../../../CustomComponents/Header";

export default WatchList = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['watchlist'],
    queryFn: getWatchList,
  });

  var CARD_HEIGHT = 150;

  const watchList = data?.data?.watchList
  const carsInWatchList = {
    data: {
      carsInWatchList: watchList?.map(val => ({car: val.car._id})),
    }
  };

  return (
    <>
      <Header showSearch={false}/>
      <View style={styles.container}>
        <SectionHeader title={"Watch List"} />
        {isLoading && (<ActivityIndicator/>)}
        {watchList && (
          <FlatList
            data={watchList}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => (
              <HomeCarCard
                CardWidth={280}
                imgHeight={170}
                ad={item.car}
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
