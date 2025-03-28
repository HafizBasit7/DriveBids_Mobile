import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
// import CustomButton from "../../../CustomComponents/CustomButton";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import HomeCarCard from "../../../CustomComponents/Tahir-Components/Home/HomeCarCard";
import Header from "../../../CustomComponents/Header";
import { useQuery } from "@tanstack/react-query";
import {listMyBids} from "../../../API_Callings/R1_API/Car";
import { ActivityIndicator } from "react-native-paper";
import { getCarsIdInWatchList } from "../../../API_Callings/R1_API/Watchlist";
import ViewAllCarCard from "../Filter&ViewAll/ViewAllCarCard";

export default MyBids = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const type = activeTab === 'Active' ? 'open' : activeTab === 'Won' ? 'won' : 'lost';
  
  const {data, isLoading} = useQuery({
    queryKey: ['myBids', type],
    queryFn: () => listMyBids(1, 10, type),
  });

  const {data: carsInWatchList, isLoading: watchlistLoading} = useQuery({
    queryKey: ['carsInWatchList'],
    queryFn: getCarsIdInWatchList,
  });

  const bids = data?.data?.bids;

  var CARD_HEIGHT = 150;

  return (
    <>
      <Header showSearch={false}/>
      <View style={styles.container}>
      <SectionHeader title={"My Bids"} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Active")}
          style={activeTab === "Active" ? styles.activeTab : styles.tab}
        >
          <Text
            style={
              activeTab === "Active" ? styles.activeTabText : styles.tabText
            }
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Won")}
          style={activeTab === "Won" ? styles.activeTab : styles.tab}
        >
          <Text
            style={activeTab === "Won" ? styles.activeTabText : styles.tabText}
          >
            Won
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Lost")}
          style={activeTab === "Lost" ? styles.activeTab : styles.tab}
        >
          <Text
            style={activeTab === "Lost" ? styles.activeTabText : styles.tabText}
          >
            Lost
          </Text>
        </TouchableOpacity>
      </View>
      
      {isLoading && (<ActivityIndicator/>)}
      {(!isLoading && bids) && (
        <FlatList
          data={bids}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <ViewAllCarCard
              ad={item.car}
              isFromMyBids={true}
              bid={item}
              notHome={true}
              carsInWatchList={carsInWatchList}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
