import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import Header from "../../../CustomComponents/Header";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { listMyAds } from "../../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";
import { getCarsIdInWatchList } from "../../../API_Callings/R1_API/Watchlist";
import ViewAllCarCard from "../Filter&ViewAll/ViewAllCarCard";

const LIMIT = 10;

export default MyAds = () => {
  
  //Car ids in watchlist
  const {data: carsInWatchList} = useQuery({
      queryKey: ['carsInWatchList'],
      queryFn: getCarsIdInWatchList,
  });

  //My ads query
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['myAds'],
    queryFn: ({pageParam = 1}) => listMyAds(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.cars?.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });
  const cars = data?.pages.flatMap((page) => page?.data?.cars) || [];
  // var CARD_HEIGHT = 150;

  return (
    <>
      <Header showSearch={false}/>
      <View style={styles.container}>
      <SectionHeader title={"My Ads"} />
      {isLoading && <ActivityIndicator/>}

      {(!isLoading && cars) && (
        <FlatList
          data={cars}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <ViewAllCarCard
              ad={item}
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
