import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getWatchList } from "../../../API_Callings/R1_API/Watchlist";
import { ActivityIndicator } from "react-native-paper";
import Header from "../../../CustomComponents/Header";
import ViewAllCarCard from "../Filter&ViewAll/ViewAllCarCard";
import Nodata from "../../../CustomComponents/NoData";

const LIMIT = 10;

const WatchList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['watchlist'],
    queryFn: ({ pageParam = 1 }) => getWatchList(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.watchList?.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });

  const watchList = data?.pages.flatMap((page) => page?.data?.watchList) || [];
  const carsInWatchList = {
    data: {
      carsInWatchList: watchList?.map(val => ({ car: val.car._id })),
    }
  };

  return (
    <>
      <Header showSearch={false} title={' '} />
      <View style={styles.container}>
        <SectionHeader title={"Watch List"} />
        {isLoading && (
          <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />
        )}
        {(!isLoading && watchList && watchList.length < 1) && (
          <Nodata />
        )}
        {(!isLoading && watchList && watchList.length > 0) && (
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
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  separator: {
    height: 15,
  },
});

export default WatchList;
