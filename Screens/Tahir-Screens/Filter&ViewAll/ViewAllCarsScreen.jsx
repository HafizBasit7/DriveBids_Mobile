import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ViewAllCarCard from "./ViewAllCarCard";
import Header from "../../../CustomComponents/Header";
import { getCarsIdInWatchList } from "../../../API_Callings/R1_API/Watchlist";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { listCars, listCarsByBidCount } from "../../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { useAuth } from "../../../R1_Contexts/authContext";
import CarLoader from "../../../CustomComponents/CarLoader";

const LIMIT = 10;

const ViewAllCarsScreen = ({ route }) => {
  const { type } = route.params;

  const { authState } = useAuth();
  const currentSelectedLocation = authState.selectedLocation ||
    authState.user.location || { coordinates: [73.1128313, 33.5255503] };

  const getQueryKey = (type) => {
    switch (type) {
      case "recent":
        return ["carsAll"];
      case "ending":
        return ["carsEndingAll"];
      default:
        return ["carsByBidCountAll"];
    }
  };

  const getQueryFn = (type) => {
    return ({ pageParam = 1 }) => {
      switch (type) {
        case "recent":
          return listCars(
            pageParam,
            LIMIT,
            "recent",
            currentSelectedLocation.coordinates[0],
            currentSelectedLocation.coordinates[1]
          );
        case "ending":
          return listCars(
            pageParam,
            LIMIT,
            "ending",
            currentSelectedLocation.coordinates[0],
            currentSelectedLocation.coordinates[1]
          );
        default:
          return listCarsByBidCount(
            pageParam,
            LIMIT,
            currentSelectedLocation.coordinates[0],
            currentSelectedLocation.coordinates[1]
          );
      }
    };
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: getQueryKey(type),
      queryFn: getQueryFn(type),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.data?.cars?.length === LIMIT
          ? allPages.length + 1
          : undefined;
      },
    });

  const { data: carsInWatchList, isLoading: watchlistLoading } = useQuery({
    queryKey: ["carsInWatchList"],
    queryFn: getCarsIdInWatchList,
  });

  if (isLoading) {
    return <CarLoader />;
  }

  const cars = data.pages.flatMap((page) => page?.data?.cars) || [];

  return (
    <>
      <Header showSearch={false} />
      <View style={styles.container}>
        <SectionHeader
          marginCustom={20}
          title={
            type === "ending"
              ? "Ending Soon"
              : type === "recent"
              ? "Newly Listed"
              : "Featured Ads"
          }
        />
        <FlatList
          data={cars}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ViewAllCarCard
              ad={type === "spotlight" ? item.car : item}
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  separator: {
    height: 15,
  },
  container: {
    backgroundColor: "#fff",

    flex: 1,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    border: "1px solid #E1E3E5",
    backgroundColor: "#fff",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    width: "33%",
    marginBottom: 10,
  },
  chipText: {
    color: "#6F6F6F",
    fontSize: 12,
    fontWeight: 700,

    fontFamily: "Inter-Regular",
  },
});

export default ViewAllCarsScreen;
