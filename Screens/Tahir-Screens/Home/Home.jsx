import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  RefreshControl,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import Header from "../../../CustomComponents/Header";
import HomeCarCard from "../../../CustomComponents/Tahir-Components/Home/HomeCarCard";
import HomeBanner from "../../../CustomComponents/HomeBanner";
import { useQuery } from "@tanstack/react-query";
import { listCars, listCarsByBidCount } from "../../../API_Callings/R1_API/Car";
import { getCarsIdInWatchList } from "../../../API_Callings/R1_API/Watchlist";
import { Icon } from "react-native-elements";
import Loader from "../../../CustomComponents/Loader";
import { useAuth } from "../../../R1_Contexts/authContext";
import Nodata from "../../../CustomComponents/NoData";

export default Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { authState } = useAuth();

  const navigation = useNavigation();

  const currentSelectedLocation = authState.selectedLocation ||
    authState.user.location || { coordinates: [73.1128313, 33.5255503] };

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["cars"],
    queryFn: () =>
      listCars(
        1,
        10,
        "recent",
        currentSelectedLocation.coordinates[0],
        currentSelectedLocation.coordinates[1]
      ),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const { data: carsInWatchList, isLoading: watchlistLoading } = useQuery({
    queryKey: ["carsInWatchList"],
    queryFn: getCarsIdInWatchList,
  });

  const {
    data: endingCarList,
    isLoading: endingCarListLoading,
    isRefetching: isRefetchingEnding,
    refetch: refetchEnding,
  } = useQuery({
    queryKey: ["carsEnding"],
    queryFn: () =>
      listCars(
        1,
        10,
        "ending",
        currentSelectedLocation.coordinates[0],
        currentSelectedLocation.coordinates[1]
      ),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const {
    data: carsByBidCount,
    isLoading: carsByBidCountLoading,
    isRefetching: isRefetchingBid,
    refetch: refetchBid,
  } = useQuery({
    queryKey: ["carsByBidCount"],
    queryFn: () =>
      listCarsByBidCount(
        1,
        10,
        currentSelectedLocation.coordinates[0],
        currentSelectedLocation.coordinates[1]
      ),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const onRefresh = () => {
    refetch();
    refetchBid();
    refetchEnding();
  };

  const CARD_WIDTH = 230;
  const SEPARATOR_WIDTH = 10;
  const ITEM_WIDTH = CARD_WIDTH + SEPARATOR_WIDTH;

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} />
      <Animated.ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              isRefetching
                ? true
                : isRefetchingEnding
                ? true
                : isRefetchingBid
                ? true
                : false
            }
            onRefresh={onRefresh}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={{ flex: 1, paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <HomeBanner />
        <SectionHeader marginCustom={20} title={"Featured Ads"} />

        {!carsByBidCountLoading ? (
          carsByBidCount.data.cars.length === 0 ? (
            <Nodata />
          ) : (
            <>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={carsByBidCount.data.cars}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                  <HomeCarCard
                    onViewPress={() => {
                      console.log("View Ad from Home");
                    }}
                    ad={item.car}
                    carsInWatchList={carsInWatchList}
                  />
                )}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 7 }}
                ItemSeparatorComponent={() => (
                  <View style={{ width: SEPARATOR_WIDTH }} />
                )}
                // snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({
                  length: CARD_WIDTH,
                  offset: ITEM_WIDTH * index,
                  index,
                })}
              />
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() =>
                  navigation.navigate("ViewAllCarsScreen", {
                    type: "spotlight",
                  })
                }
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={18}
                  color="#2F61BF"
                />
              </TouchableOpacity>
            </>
          )
        ) : (
          <Loader />
        )}
        <SectionHeader title={"Ending Soon"} />

        {!endingCarListLoading ? (
          endingCarList.data.cars.length === 0 ? (
            <Nodata />
          ) : (
            <>
              <FlatList
                data={endingCarList.data.cars}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                  <HomeCarCard carsInWatchList={carsInWatchList} ad={item} />
                )}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 5 }}
                ItemSeparatorComponent={() => (
                  <View style={{ width: SEPARATOR_WIDTH }} />
                )}
                // snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({
                  length: CARD_WIDTH,
                  offset: ITEM_WIDTH * index,
                  index,
                })}
              />
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() =>
                  navigation.navigate("ViewAllCarsScreen", { type: "ending" })
                }
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={18}
                  color="#2F61BF"
                />
              </TouchableOpacity>
            </>
          )
        ) : (
          <Loader />
        )}

        <SectionHeader title={"Newly Listed"} />
        {!isLoading ? (
          data.data.cars.length === 0 ? (
            <View style={{ marginBottom: 30 }}>
              {" "}
              <Nodata />
            </View>
          ) : (
            <>
              <FlatList
                data={data.data.cars}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                  <HomeCarCard carsInWatchList={carsInWatchList} ad={item} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start" // Optional: Snaps items to the start
                decelerationRate="fast"
                pagingEnabled={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
                ItemSeparatorComponent={() => (
                  <View style={{ width: SEPARATOR_WIDTH }} />
                )}
                // snapToInterval={ITEM_WIDTH}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({
                  length: CARD_WIDTH,
                  offset: ITEM_WIDTH * index,
                  index,
                })}
              />
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() =>
                  navigation.navigate("ViewAllCarsScreen", { type: "recent" })
                }
              >
                <Text style={[styles.viewAllText, { marginBottom: 30 }]}>
                  View All{" "}
                </Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={18}
                  color="#2F61BF"
                  style={{ marginBottom: 29 }}
                />
              </TouchableOpacity>
            </>
          )
        ) : (
          <Loader />
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "100%",
    zIndex: 10,
    backgroundColor: "#fff",
  },
  viewAllButton: {
    alignSelf: "flex-end",
    marginHorizontal: "auto",
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",

    borderRadius: 5,
  },
  viewAllText: {
    color: "#2F61BF",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Inter-Regular",
  },
});
