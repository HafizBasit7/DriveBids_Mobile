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

export default MyBids = () => {
  const [activeTab, setActiveTab] = useState("Active");

  const carData = [
    {
      id: "1",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      favorite: false,
      yourBid: "30K",
      winning: false,
    },
    {
      id: "2",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      yourBid: "40K",
      favorite: true,
      winning: true,
    },
    {
      id: "3",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      favorite: true,
      yourBid: "30K",
      winning: true,
    },
    {
      id: "4",
      image:
        "https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1280,c_limit/DSC_5903.jpg",
      name: "Volkswagen Passat",
      year: "1967",
      engine: "34000",
      transmission: "Manual",
      topBid: "25k",
      timeLeft: "10h:20m:11s",
      favorite: true,
      yourBid: "30K",
      winning: false,
    },

    // Add more car objects here...
  ];
  var CARD_HEIGHT = 150;

  return (
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
      <FlatList
        data={carData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <HomeCarCard
            isFromMyBids={true}
            onIncreaseBid={() => {
              console.log("Increase the bid");
            }}
            onCancelBid={() => {
              console.log("Cencel the bid");
            }}
            CardWidth={300}
            imgHeight={170}
            onViewPress={() => {
              console.log("Do Something from My Bids");
            }}
            {...item}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
