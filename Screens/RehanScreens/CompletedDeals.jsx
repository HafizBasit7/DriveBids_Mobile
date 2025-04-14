import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
// import CustomButton from "../../../CustomComponents/CustomButton";
import SectionHeader from "../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import Header from "../../CustomComponents/Header";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {getCompletedDeals, listMyBids} from "../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";
import { getCarsIdInWatchList } from "../../API_Callings/R1_API/Watchlist";
import ViewAllCarCard from "../../Screens/Tahir-Screens/Filter&ViewAll/ViewAllCarCard";
import Nodata from "../../CustomComponents/NoData";

const LIMIT = 10;

export default CompletedDeals = () => {
  const [activeTab, setActiveTab] = useState("Bought");
  const type = activeTab === 'Bought' ? 'buy' : 'sell';

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['myCompletedDeals', type],
    queryFn: ({pageParam = 1}) => getCompletedDeals(pageParam, LIMIT, type),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.completedDeals?.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });

  const {data: carsInWatchList, isLoading: watchlistLoading} = useQuery({
    queryKey: ['carsInWatchList'],
    queryFn: getCarsIdInWatchList,
  });

  const completedDeals = data?.pages.flatMap((page) => page?.data?.completedDeals) || [];
  // var CARD_HEIGHT = 150;

  return (
    <>
      <Header showSearch={false} title={'Settings'}/>
      <View style={styles.container}>
      {/* <SectionHeader title={"Completed Deals"} /> */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Bought")}
          style={activeTab === "Bought" ? styles.activeTab : styles.tab}
        >
          <Text
            style={
              activeTab === "Bought" ? styles.activeTabText : styles.tabText
            }
          >
            Bought
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Sold")}
          style={activeTab === "Sold" ? styles.activeTab : styles.tab}
        >
          <Text
            style={activeTab === "Sold" ? styles.activeTabText : styles.tabText}
          >
            Sold </Text>
        </TouchableOpacity>
      </View>
      
      {isLoading && (<ActivityIndicator style={{flex: 1, justifyContent: 'center'}}/>)}
      {(!isLoading && completedDeals && completedDeals.length < 1) && (
        <Nodata/>
      )}
      {(!isLoading && completedDeals && completedDeals.length > 0) && (
        <FlatList
          data={completedDeals}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <ViewAllCarCard
              ad={item.car}
              notHome={true}
              isFromCompletedDeals={true}
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
     backgroundColor:"#fff",
     paddingVertical:15
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: GlobalStyles.colors.ButtonColor,
  },
  tabText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "black",
  },
  activeTabText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "black",
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
