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
import SellerProfileCard from "../../../CustomComponents/UmairComponents/SellerProfileCard";
import Header from "../../../CustomComponents/Header"; 
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCarsIdInWatchList } from "../../../API_Callings/R1_API/Watchlist";
import { getCarOwnerCars } from "../../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";
import ViewAllCarCard from "../Filter&ViewAll/ViewAllCarCard";


const LIMIT = 10;

export default OwnerProfile = ({route}) => {
  var CARD_HEIGHT = 150;

  const {userId} = route.params;
  
  const {data: carsInWatchList, isLoading: watchlistLoading} = useQuery({
    queryKey: ['carsInWatchList'],
    queryFn: getCarsIdInWatchList,
  });

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['carOwnerCars'],
    queryFn: ({pageParam = 1}) => getCarOwnerCars(pageParam, LIMIT, userId),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.cars?.cars.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });

  const cars = data?.pages.flatMap((page) => page?.data?.cars.cars) || [];
  const user = data?.pages[0].data.user;

  return (
    <>
      <Header showSearch={false}/>
      <View style={styles.container}>
        <View style={{marginRight: '30', marginTop: '30'}}>
          {!isLoading && (
            <SellerProfileCard 
              name={user.name} 
              status={user.type === 'trader' ? 'Trader' : 'Private Seller'}
                profileImage={user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
              ShowChatOptions={false} 
            />
          )}
        </View>
        {!isLoading && (<SectionHeader title={`${user.name} Listings`} />)}
        {isLoading && <ActivityIndicator/>}
        {!isLoading && (
          // <FlatList
          //   data={cars}
          //   keyExtractor={(item) => String(item._id)}
          //   renderItem={({ item }) => (
          //     <HomeCarCard
          //       CardWidth={280}
          //       imgHeight={170}
          //       ad={item}
          //       carsInWatchList={carsInWatchList}
          //     />
          //   )}
          //   onEndReached={() => {
          //     if (hasNextPage && !isFetchingNextPage) {
          //       fetchNextPage();
          //     }
          //   }}
          //   onEndReachedThreshold={0.5}
          //   ListFooterComponent={
          //     isFetchingNextPage ? <ActivityIndicator size="small" /> : null
          //   }
          //   showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
          //   contentContainerStyle={{
          //     paddingVertical: 10,

          //     justifyContent: "center",
          //     alignItems: "center",
          //   }} // Add vertical padding
          //   ItemSeparatorComponent={() => (
          //     <View style={{ height: 5 }} /> // Adjust spacing between items
          //   )}
          //   removeClippedSubviews={true}
          //   getItemLayout={(data, index) => ({
          //     length: CARD_HEIGHT, // Adjust to item height
          //     offset: CARD_HEIGHT * index,
          //     index,
          //   })}
          // />
            <FlatList
                data={cars}
                keyExtractor={(item) => item._id} 
                renderItem={({ item }) => (
            
                <ViewAllCarCard
                    ad={item}
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
  contentContainer: {
    paddingVertical: 10,
    flex:1,
    paddingHorizontal: 10, 
    backgroundColor: '#fff',
    paddingBottom:40 
   
  },
  container: {
    flex: 1,
  },
});
