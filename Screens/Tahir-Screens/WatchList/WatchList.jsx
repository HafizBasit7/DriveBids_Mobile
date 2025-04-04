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
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getWatchList } from "../../../API_Callings/R1_API/Watchlist";
import { ActivityIndicator } from "react-native-paper";
import Header from "../../../CustomComponents/Header";
import ViewAllCarCard from "../Filter&ViewAll/ViewAllCarCard";

const LIMIT = 10;

export default WatchList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['watchlist'],
    queryFn: ({pageParam = 1}) => getWatchList(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.watchList?.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });

  // var CARD_HEIGHT = 150;
  const watchList = data?.pages.flatMap((page) => page?.data?.watchList) || [];
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
              <ViewAllCarCard
                ad={item.car}
                notHome={true}
                carsInWatchList={carsInWatchList}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator size="small" /> : null
            }
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor:"#fff"
  },
  contentContainer: {
    paddingVertical: 10,
    flex:1,
    paddingHorizontal: 10, 
    backgroundColor: '#fff',
    paddingBottom:40 
   
  },
  separator: {
    height: 15, 
  },
});
